"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const rooms = new Map();
const addRoom = (newRoom) => {
    if (rooms.has(newRoom.id)) {
        throw new Error('Room already exists, uuid fudged up somehow');
    }
    const room = {
        id: newRoom.id || uuid_1.v4(),
        name: newRoom.name,
        users: [],
        queue: []
    };
    rooms.set(newRoom.id, room);
    return room;
};
// TODO change output to boolean
const removeRoom = (id) => {
    if (!rooms.has(id)) {
        throw new Error(`room ${id} doesn't exist`);
    }
    rooms.delete(id);
};
const removeAllRooms = () => {
    rooms.clear();
};
const getRoom = (id) => {
    if (!rooms.has(id)) {
        throw new Error(`room ${id} doesn't exist`);
    }
    return rooms.get(id); // TODO change signature to Room | null
};
const getAllRooms = () => {
    return Array.from(rooms.values());
};
const cleanRoom = (room) => {
    return {
        id: room.id,
        name: room.name
    };
};
const addUserToRoom = (socketId, newUser) => {
    const users = getRoom(newUser.roomId).users;
    const user = Object.assign(Object.assign({}, newUser), { id: uuid_1.v4(), // randomly generate id
        socketId });
    // note: we aren't storing the bare name, just using it for duplication checks
    const bareName = user.name.trim().toLowerCase();
    const existingUser = users.find(u => {
        return u.id === user.id
            && u.name.trim().toLowerCase() === bareName;
    });
    if (existingUser) {
        throw new Error(`user ${user.name} already exists in room ${user.roomId}; didn't add.`);
    }
    users.push(user);
    return user;
};
const removeUserFromRoom = (socketId, roomId) => {
    const users = getRoom(roomId).users;
    const index = users.findIndex(u => u.socketId === socketId);
    if (index === -1) {
        throw new Error(`user with socket id ${socketId} doesn't exist in room ${roomId}; couldn't remove.`);
    }
    return users.splice(index, 1)[0];
};
// returns a ref to a new User array (not array linked to room!)
const getUsersInRoom = (roomId) => {
    return [...getRoom(roomId).users];
};
// returns a ref to a new User array (not array linked to room!)
const getQueuedUsersInRoom = (roomId) => {
    return [...getRoom(roomId).queue];
};
const enqueueUser = (id, roomId) => {
    const users = getRoom(roomId).users;
    const existingUser = users.find(u => u.id === id);
    if (!existingUser) {
        throw new Error(`user ${id} doesn't exist in user list in room ${roomId}; couldn't be enqueued`);
    }
    const queue = getRoom(roomId).queue;
    queue.push(existingUser);
    return existingUser;
};
// TODO rename id param to userId
const dequeueUser = (id, roomId) => {
    const queue = getRoom(roomId).queue;
    const index = queue.findIndex(u => u.id === id);
    if (index === -1) {
        throw new Error(`user ${id} doesn't exist in queue in room ${roomId}; couldn't be dequeued`);
    }
    return queue.splice(index, 1)[0];
};
exports.default = {
    addRoom,
    removeRoom,
    removeAllRooms,
    getRoom,
    getAllRooms,
    cleanRoom,
    addUserToRoom,
    removeUserFromRoom,
    getUsersInRoom,
    getQueuedUsersInRoom,
    enqueueUser,
    dequeueUser
};
