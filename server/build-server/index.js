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
const userService_1 = __importDefault(require("./services/userService"));
const utils_1 = require("./utils");
const server = http_1.default.createServer(app_1.default);
const io = socket_io_1.default(server);
// keeps track of current connections for logging purposes
let connectCounter = 0;
let roomCounter = 0;
// executes given event handler and uses acknowledgement callback to send error back to client on failure
// this is what every socket handler should call to keep consistency.
const handleSocketEvent = (event, data, ackCallback, eventHandler) => {
    logger_1.default.event(`${event} event received`, data);
    try {
        eventHandler();
    }
    catch (e) {
        const error = e;
        logger_1.default.error(error);
        ackCallback({ error: error.message });
    }
    logger_1.default.printAppState();
};
io.on('connection', (socket) => {
    logger_1.default.event('a user has connected!');
    console.log(`current number of users connected: ${++connectCounter}`);
    logger_1.default.printAppState();
    // Create a new room and send back room data on success. Return error message on failure.
    socket.on(types_1.SocketEvents.CREATE_ROOM, (data, callback) => {
        handleSocketEvent(types_1.SocketEvents.CREATE_ROOM, data, callback, () => {
            const newRoom = utils_1.toNewRoom(data);
            const room = roomService_1.default.addRoom(newRoom);
            const cleanRoom = utils_1.toCleanRoom(room);
            // just for logging purposes
            roomCounter++;
            callback({ room: cleanRoom });
        });
    });
    // Check if room exists and send back room data on success. Return error message on failure.
    socket.on(types_1.SocketEvents.ROOM_CHECK, (data, callback) => {
        handleSocketEvent(types_1.SocketEvents.ROOM_CHECK, data, callback, () => {
            const { roomId } = utils_1.toSocketData(data);
            if (roomId) {
                const room = roomService_1.default.getRoom(roomId);
                const cleanRoom = utils_1.toCleanRoom(room);
                callback({
                    room: cleanRoom,
                    queuedUsers: room.queue
                });
            }
            else {
                throw new Error('roomId is missing or invalid');
            }
        });
    });
    // Caches user and adds them to specified room. Return error message on failure.
    socket.on(types_1.SocketEvents.JOIN, (data, callback) => {
        handleSocketEvent(types_1.SocketEvents.JOIN, data, callback, () => {
            const newUser = utils_1.toNewUser(data);
            // store user in memory
            userService_1.default.addUser(socket.id, newUser);
            // make socket join room
            socket.join(newUser.roomId);
            callback({});
        });
    });
    // Enqueues user in specfied room. Return error message on failure.
    socket.on(types_1.SocketEvents.ENQUEUE, (data, callback) => {
        handleSocketEvent(types_1.SocketEvents.ENQUEUE, data, callback, () => {
            const user = utils_1.toUser(data);
            roomService_1.default.enqueueUser(user, user.roomId);
            // broadcast new enqueued user to all clients in room including sender
            io.in(user.roomId).emit(types_1.SocketEvents.ENQUEUE, {
                enqueuedUser: user
            });
            callback({});
        });
    });
    // Dequeues user in specfied room. Return error message on failure.
    socket.on(types_1.SocketEvents.DEQUEUE, (data, callback) => {
        handleSocketEvent(types_1.SocketEvents.DEQUEUE, data, callback, () => {
            const { username, roomId } = utils_1.toSocketData(data);
            if (username && roomId) {
                const dequeuedUser = roomService_1.default.dequeueUser(username, roomId);
                // broadcast dequeued user to all clients in room including sender
                io.in(roomId).emit(types_1.SocketEvents.DEQUEUE, {
                    dequeuedUser
                });
                callback({});
            }
            else {
                throw new Error('username or roomId are missing or invalid');
            }
        });
    });
    // Verifies given password and returns success/failure result. Return error message on failure.
    socket.on(types_1.SocketEvents.TRY_ADMIN_STATUS, (data, callback) => {
        handleSocketEvent(types_1.SocketEvents.TRY_ADMIN_STATUS, data, callback, () => {
            const { adminPassword, roomId } = utils_1.toSocketData(data);
            if (adminPassword && roomId) {
                const isPasswordCorrect = roomService_1.default.verifyAdminPassword(adminPassword, roomId);
                if (isPasswordCorrect) {
                    callback({}); // empty callback means success
                }
                else {
                    throw new Error('given admin password was incorrect');
                }
            }
            else {
                throw new Error('adminPassword or roomId are missing or invalid');
            }
        });
    });
    // Deletes user from user cache and deletes room if room is empty.
    socket.on(types_1.SocketEvents.DISCONNECT, () => {
        logger_1.default.event(`${types_1.SocketEvents.DISCONNECT} event received`);
        if (userService_1.default.hasUser(socket.id)) {
            try {
                // remove user from memory
                const removedUser = userService_1.default.removeUser(socket.id);
                // get socket room user was in
                const room = io.sockets.adapter.rooms[removedUser.roomId];
                logger_1.default.info(`Room ${removedUser.roomId} length: ${room ? room.length : 0}`);
                // delete room from memory if its empty (empty rooms are undefined)
                // we check for dev env b/c it's annoying to have rooms being deleted everytime client refreshes after hot change
                if (process.env.NODE_ENV !== 'development' && (!room || room.length === 0)) {
                    logger_1.default.info(`Room ${removedUser.roomId} is empty now, deleting from memory...`);
                    roomService_1.default.removeRoom(removedUser.roomId);
                    // just for logging purposes
                    roomCounter--;
                }
            }
            catch (e) {
                // TODO this line will usually hit when a user who hasn't signed up disconnects, maybe emit LEAVE from client side?
                const error = e;
                logger_1.default.error(error);
            }
        }
        logger_1.default.printAppState();
        console.log(`current number of users connected: ${--connectCounter}`);
        console.log(`current number of rooms: ${roomCounter}`);
    });
});
// boot up server
server.listen(config_1.default.PORT, () => {
    logger_1.default.info(`Server starting on port ${config_1.default.PORT}`);
});
