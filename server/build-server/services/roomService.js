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
        queue: [],
        userCount: 0
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
exports.default = {
    addRoom,
    removeRoom,
    getRoom,
    getAllRooms,
    verifyAdminPassword,
};
