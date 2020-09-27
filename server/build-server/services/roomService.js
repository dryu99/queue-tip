"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const rooms = new Map();
const addRoom = (newRoom) => {
    const room = {
        id: uuid_1.v4(),
        name: newRoom.name,
        adminPassword: newRoom.adminPassword,
        queue: []
    };
    if (rooms.has(room.id)) {
        throw new Error('Trying to add room but id already exists, uuid fudged up or sth else went wrong.');
    }
    rooms.set(room.id, room);
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
// returns a ref to a new User array (not array linked to room!)
const getQueuedUsersInRoom = (roomId) => {
    return [...getRoom(roomId).queue];
};
const enqueueUser = (user, roomId) => {
    const queue = getRoom(roomId).queue;
    const existingQueuedUser = queue.find(u => u.name === user.name);
    if (existingQueuedUser) {
        throw new Error(`user ${user.name} already exists in queue in room ${roomId}; couldn't be enqueued`);
    }
    queue.push(user);
};
// TODO rename id param to userId
const dequeueUser = (name, roomId) => {
    const queue = getRoom(roomId).queue;
    const index = queue.findIndex(u => u.name === name);
    if (index === -1) {
        throw new Error(`user ${name} doesn't exist in queue in room ${roomId}; couldn't be dequeued`);
    }
    return queue.splice(index, 1)[0];
};
const verifyAdminPassword = (passwordAttempt, roomId) => {
    const password = getRoom(roomId).adminPassword;
    return passwordAttempt === password;
};
exports.default = {
    addRoom,
    removeRoom,
    removeAllRooms,
    getRoom,
    getAllRooms,
    getQueuedUsersInRoom,
    enqueueUser,
    dequeueUser,
    verifyAdminPassword
};
