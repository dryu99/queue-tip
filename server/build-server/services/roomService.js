"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
// We cache live room metadata in this map so new clients can init their rooms properly.
// key = id, val = Room
const rooms = new Map();
const addRoom = (newRoom) => {
    const newId = nanoid_1.nanoid(8);
    if (rooms.has(newId)) {
        throw new Error('Trying to add room but id already exists, uuid fudged up or sth else went wrong.');
    }
    const room = {
        id: newId,
        name: newRoom.name,
        adminPassword: newRoom.adminPassword,
        users: [],
        queue: []
    };
    rooms.set(room.id, room);
    return room;
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
// TODO change output to boolean
const removeRoom = (id) => {
    if (!rooms.has(id)) {
        throw new Error(`room ${id} doesn't exist`);
    }
    rooms.delete(id);
};
const verifyAdminPassword = (passwordAttempt, roomId) => {
    const password = getRoom(roomId).adminPassword;
    return passwordAttempt === password;
};
const addUserToRoom = (room, user) => {
    // use name to search b/c we don't want users with duplicate names in same room
    const index = room.users.findIndex(u => u.name.toLowerCase() === user.name.toLowerCase());
    if (index !== -1) {
        throw new Error(`user with name ${user.name} already exists in room ${room.name}`);
    }
    room.users.push(user);
};
const removeUserFromRoom = (room, userId) => {
    // remove from users list
    // use id to search b/c we only have access to id when a socket disconnects
    const usersIndex = room.users.findIndex(u => u.id === userId);
    if (usersIndex === -1) {
        throw new Error(`user with id ${userId} doesn't exist in room ${room.name}; couldn't remove user.`);
    }
    const user = room.users.splice(usersIndex, 1)[0];
    // // remove from queue list
    // const queueIndex = room.queue.findIndex(u => u.id === userId);
    // if (queueIndex !== -1) {
    //   room.queue.splice(queueIndex, 1);
    // }
    return user;
};
exports.default = {
    addRoom,
    removeRoom,
    getRoom,
    getAllRooms,
    verifyAdminPassword,
    addUserToRoom,
    removeUserFromRoom
};
