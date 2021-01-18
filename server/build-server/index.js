"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./utils/config"));
const logger_1 = __importDefault(require("./utils/logger"));
const types_1 = require("./types");
const roomService_1 = __importDefault(require("./services/roomService"));
const utils_1 = require("./utils");
const server = http_1.default.createServer(app_1.default);
const io = socket_io_1.default(server, {
    pingTimeout: 300000 // should handle random disconnects on idle clients (https://github.com/socketio/socket.io/issues/3259)
});
// executes given event handler and uses acknowledgement callback to send error back to client on failure
// this is what every socket handler should call to keep consistency.
const handleSocketEvent = (event, data, callback, eventHandler) => {
    try {
        logger_1.default.event(`${event} event received`, data);
        if (data === null || data === undefined) {
            throw Error('event data was null or undefined');
        }
        eventHandler();
    }
    catch (e) {
        const error = e;
        logger_1.default.error(error);
        callback({ error: error.message });
    }
    logger_1.default.printAppState();
};
io.on(types_1.SocketEvents.CONNECTION, (socket) => {
    logger_1.default.event(types_1.SocketEvents.CONNECTION);
    logger_1.default.printAppState();
    // TODO would love to just use an HTTP request to handle this but we need socket id.
    // Create a new room and cache on server
    socket.on(types_1.SocketEvents.CREATE_ROOM, (data, callback) => {
        handleSocketEvent(types_1.SocketEvents.CREATE_ROOM, data, callback, () => {
            const newRoom = utils_1.toNewRoom(data.newRoom);
            const room = roomService_1.default.addRoom(newRoom);
            const newUser = utils_1.toNewUser(data.newUser);
            const user = utils_1.toUser(Object.assign(Object.assign({}, newUser), { id: socket.id }));
            // have admin user join room
            socket.join(room.id);
            roomService_1.default.addUserToRoom(room, user);
            // send back relevant room and user data to sender
            const cleanRoom = utils_1.toCleanRoom(room);
            callback({ room: cleanRoom, user });
        });
    });
    // Let other clients know new user has joined the room
    socket.on(types_1.SocketEvents.JOIN, (data, callback) => {
        handleSocketEvent(types_1.SocketEvents.JOIN, data, callback, () => {
            const roomId = utils_1.parseString(data.roomId);
            const room = roomService_1.default.getRoom(roomId);
            const newUser = utils_1.toNewUser(data.newUser);
            const user = utils_1.toUser(Object.assign(Object.assign({}, newUser), { id: socket.id }));
            // have user join room
            socket.join(roomId);
            roomService_1.default.addUserToRoom(room, user);
            // broadcast new user to all clients in room except sender
            socket.broadcast.to(roomId).emit(types_1.SocketEvents.JOIN, { newUser: user });
            // send back relevant room data to sender so they can init room state
            callback({ user, queue: room.queue, userCount: room.users.length });
        });
    });
    // Enqueue user in specified room.
    socket.on(types_1.SocketEvents.ENQUEUE, (data, callback) => {
        handleSocketEvent(types_1.SocketEvents.ENQUEUE, data, callback, () => {
            const roomId = utils_1.parseString(data.roomId);
            const room = roomService_1.default.getRoom(roomId);
            const user = utils_1.toUser(data.user);
            // enqueue user
            room.queue.push(user);
            // broadcast new enqueued user to all clients in room including sender
            io.in(roomId).emit(types_1.SocketEvents.ENQUEUE, { enqueuedUser: user });
        });
    });
    // Dequeue user in specified room.
    socket.on(types_1.SocketEvents.DEQUEUE, (data, callback) => {
        handleSocketEvent(types_1.SocketEvents.DEQUEUE, data, callback, () => {
            const roomId = utils_1.parseString(data.roomId);
            const room = roomService_1.default.getRoom(roomId);
            // dequeue user
            const user = room.queue.shift();
            if (user) {
                // broadcast dequeued user to all clients in room including sender
                io.in(roomId).emit(types_1.SocketEvents.DEQUEUE, { dequeuedUserId: user.id });
            }
            else {
                logger_1.default.error(`Room ${roomId} was empty, couldn't dequeue.`);
            }
        });
    });
    // // Verifies given password and returns success/failure result.
    // socket.on(SocketEvents.TRY_ADMIN_STATUS, (data: EventData, callback: AckCallback) => {
    //   handleSocketEvent(SocketEvents.TRY_ADMIN_STATUS, data, callback, () => {
    //     const adminPassword = parseString(data.adminPassword);
    //     const roomId = parseString(data.roomId);
    //     if (adminPassword && roomId) {
    //       const isPasswordCorrect = roomService.checkAdminPassword(adminPassword, roomId);
    //       if (isPasswordCorrect) {
    //         callback({}); // empty callback means success
    //       } else {
    //         throw new Error('given admin password was incorrect');
    //       }
    //     } else {
    //       throw new Error('adminPassword or roomId are missing or invalid');
    //     }
    //   });
    // });
    // Broadcast to other clients in room about disconnect, and delete room if empty
    socket.on(types_1.SocketEvents.DISCONNECTING, () => {
        try {
            logger_1.default.event(types_1.SocketEvents.DISCONNECTING);
            const socketSids = Object.keys(io.sockets.adapter.sids[socket.id]);
            // if length > 1, socket was in a room
            if (socketSids.length > 1) {
                // NOTE: this logic assumes that the user will be in 1 room max at a time
                const roomId = socketSids[1];
                const room = roomService_1.default.getRoom(roomId);
                // update user count
                roomService_1.default.removeUserFromRoom(room, socket.id);
                // broadcast disconnected user to all clients in room except sender
                socket.broadcast.to(roomId).emit(types_1.SocketEvents.LEAVE, { disconnectedUserId: socket.id });
                // delete room from memory if it is empty
                const socketRoom = io.sockets.adapter.rooms[roomId];
                if (!socketRoom || socketRoom.length === 1) {
                    logger_1.default.info(`Room ${roomId} is empty now, deleting from memory...`);
                    roomService_1.default.removeRoom(roomId);
                }
            }
        }
        catch (e) {
            const error = e;
            logger_1.default.error(error);
        }
        logger_1.default.printAppState();
    });
});
// boot up server
server.listen(config_1.default.PORT, () => {
    logger_1.default.info(`Server starting on port ${config_1.default.PORT}`);
});
