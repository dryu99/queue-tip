"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
// TODO might be good to change this map to CleanUser but eh
/**
 * Map that keeps track of minimal user data. Mostly needed for handling removals on disconnects (only have socket ids to find users).
 * key = socket.id, value = NewUser
 */
const users = new Map();
const addUser = (socketId, newUser) => {
    if (users.has(socketId)) {
        logger_1.default.error(`User ${socketId} already exists in user map; re-added user.`);
    }
    users.set(socketId, newUser);
};
const removeUser = (socketId) => {
    if (!users.has(socketId)) {
        throw new Error(`User ${socketId} doesn't exist in user map; couldn't remove.`);
    }
    const user = users.get(socketId);
    users.delete(socketId);
    return user;
};
const cleanUser = (user) => {
    return {
        id: user.id,
        name: user.name,
        roomId: user.roomId,
        type: user.type,
    };
};
exports.default = {
    addUser,
    removeUser,
    cleanUser
};
