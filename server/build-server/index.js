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
const printAppState = () => {
    logger_1.default.info('--- SERVER STATE ---');
    logger_1.default.info('ROOMS: ', roomService_1.default.getAllRooms().map(r => ({
        id: r.id,
        name: r.name,
        users: r.users.map(u => `${u.name}: ${u.id}`),
        queue: r.queue.map(u => `${u.name}: ${u.id}`),
    })));
    logger_1.default.info('--------------------');
};
// keeps track of current connections
let connectCounter = 0;
io.on('connection', (socket) => {
    logger_1.default.event('a user has connected!');
    console.log(`current number of users connected: ${++connectCounter}`);
    printAppState();
    // TODO should generate uuid on server not client
    // Create a new room and send back room data on completion. Return error message on failure.
    socket.on(types_1.SocketEvents.CREATE_ROOM, (data, callback) => {
        logger_1.default.event(`${types_1.SocketEvents.CREATE_ROOM} event received`, data);
        try {
            const newRoom = utils_1.toNewRoom(data);
            const room = roomService_1.default.addRoom(newRoom);
            const cleanRoom = roomService_1.default.cleanRoom(room);
            callback({ room: cleanRoom });
        }
        catch (e) {
            const error = e;
            logger_1.default.error(error.message);
            callback({ error: error.message });
        }
        printAppState();
    });
    socket.on(types_1.SocketEvents.ROOM_CHECK, (data, callback) => {
        logger_1.default.event(`${types_1.SocketEvents.ROOM_CHECK} event received`, data);
        try {
            const { roomId } = utils_1.toSocketRoomData(data);
            const room = roomService_1.default.getRoom(roomId);
            const cleanRoom = roomService_1.default.cleanRoom(room);
            callback({ room: cleanRoom });
        }
        catch (e) {
            const error = e;
            logger_1.default.error(error.message);
            callback({ error: error.message });
        }
    });
    socket.on(types_1.SocketEvents.JOIN, (data, callback) => {
        logger_1.default.event(`${types_1.SocketEvents.JOIN} event received`, data);
        try {
            const newUser = utils_1.toNewUser(data);
            // get users + queue first, we don't want them to contain the new user
            const usersInRoom = roomService_1.default.getUsersInRoom(newUser.roomId);
            const usersInQueue = roomService_1.default.getQueuedUsersInRoom(newUser.roomId);
            // add user to user map + room
            userService_1.default.addUser(socket.id, newUser);
            const user = roomService_1.default.addUserToRoom(socket.id, newUser);
            // clean data before returning to client
            const cleanUser = userService_1.default.cleanUser(user);
            // broadcast new user to all clients (not including sender) in current room
            socket.broadcast.to(cleanUser.roomId).emit(types_1.SocketEvents.NEW_USER_JOIN, {
                newUser: cleanUser
            });
            // add user to current room
            socket.join(cleanUser.roomId);
            callback({
                user: cleanUser,
                usersInRoom,
                usersInQueue,
            });
        }
        catch (e) {
            const error = e;
            logger_1.default.error(error.message);
            callback({ error: error.message });
        }
        printAppState();
    });
    socket.on(types_1.SocketEvents.ENQUEUE, (data, callback) => {
        logger_1.default.event(`${types_1.SocketEvents.ENQUEUE} event received`, data);
        try {
            const { userId, roomId } = utils_1.toSocketData(data);
            const enqueuedUser = roomService_1.default.enqueueUser(userId, roomId);
            const cleanUser = userService_1.default.cleanUser(enqueuedUser);
            // broadcast new queue user to all clients (not including sender) in current room
            socket.broadcast.to(roomId).emit(types_1.SocketEvents.ENQUEUE, {
                enqueuedUser: cleanUser
            });
            callback({
                enqueuedUser: cleanUser // TODO rename to newqueue user, have to change in client side too
            });
        }
        catch (e) {
            const error = e;
            logger_1.default.error(error.message);
            callback({ error: error.message });
        }
        printAppState();
    });
    socket.on(types_1.SocketEvents.DEQUEUE, (data, callback) => {
        logger_1.default.event(`${types_1.SocketEvents.DEQUEUE} event received`, data);
        try {
            const { userId, roomId } = utils_1.toSocketData(data);
            const dequeuedUser = roomService_1.default.dequeueUser(userId, roomId);
            const cleanUser = userService_1.default.cleanUser(dequeuedUser);
            // broadcast dequeued user to all clients (not including sender) in current room
            socket.broadcast.to(roomId).emit(types_1.SocketEvents.DEQUEUE, {
                dequeuedUser: cleanUser
            });
            callback({
                dequeuedUser: cleanUser
            });
        }
        catch (e) {
            const error = e;
            logger_1.default.error(error.message);
            callback({ error: error.message });
        }
        printAppState();
    });
    socket.on(types_1.SocketEvents.UPDATE_USER, (data, callback) => {
        logger_1.default.event(`${types_1.SocketEvents.UPDATE_USER} event received`, data);
        try {
            const cleanUser = utils_1.toCleanUser(data);
            const updatedUser = roomService_1.default.updateUserInRoom(cleanUser);
            const cleanUpdatedUser = utils_1.toCleanUser(updatedUser); // TODO redundant? just return cleanUser?
            // broadcast updated user to all clients (not including sender) in current room
            socket.broadcast.to(updatedUser.roomId).emit(types_1.SocketEvents.UPDATE_USER, {
                updatedUser: cleanUpdatedUser
            });
            callback({
                updatedUser: cleanUpdatedUser
            });
        }
        catch (e) {
            const error = e;
            logger_1.default.error(error.message);
            callback({ error: error.message });
        }
        printAppState();
    });
    socket.on(types_1.SocketEvents.DISCONNECT, () => {
        logger_1.default.event(`${types_1.SocketEvents.DISCONNECT} event received`);
        console.log(`current number of users connected: ${--connectCounter}`);
        try {
            // remove user from user map + room
            const minUser = userService_1.default.removeUser(socket.id);
            const user = roomService_1.default.removeUserFromRoom(socket.id, minUser.roomId);
            // clean data before returning to client TODO this is redundant?
            const cleanUser = userService_1.default.cleanUser(user);
            // delete room from memory if its empty
            // we check for development env b/c it's annoying to have rooms be deleted everytime client refreshes after changes
            if (process.env.NODE_ENV !== 'development' && roomService_1.default.getUsersInRoom(cleanUser.roomId).length === 0) {
                roomService_1.default.removeRoom(cleanUser.roomId);
            }
            // broadcast user left to all clients (not including sender) in current room
            io.in(cleanUser.roomId).emit(types_1.SocketEvents.LEAVE, {
                leftUser: cleanUser
            });
        }
        catch (e) {
            // TODO this line will usually hit when a user who hasn't signed up disconnects, maybe emit LEAVE from client side?
            const error = e;
            logger_1.default.error(error.message);
        }
        printAppState();
    });
});
// boot up server
server.listen(config_1.default.PORT, () => {
    logger_1.default.info(`Server starting on port ${config_1.default.PORT}`);
});
