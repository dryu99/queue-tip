"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// We cache user metadata in this map so we can verify which user names have been taken.
// key = id, val = User
const users = new Map();
const getUser = (userId) => {
    const user = users.get(userId);
    if (!user) {
        throw new Error(`User ${userId} doesn't exist; can't retrieve.`);
    }
    return user;
};
const getUsers = () => {
    return Array.from(users.values());
};
const addUser = (id, newUser) => {
    if (users.has(id)) {
        throw Error(`User ${id} '${newUser.name}' already exists in user map; couldn't add.`);
    }
    // create full user
    const user = {
        id,
        name: newUser.name,
        isAdmin: newUser.isAdmin
    };
    // cache user
    users.set(id, user);
    return user;
};
const removeUser = (id) => {
    if (!users.has(id)) {
        throw new Error(`User ${id} doesn't exist in user map; couldn't remove.`);
    }
    // remove from cache
    const user = users.get(id); // user guaranteed to exist b/c 1st condition
    users.delete(id);
    return user;
};
const hasUser = (socketId) => {
    return users.has(socketId);
};
exports.default = {
    getUser,
    addUser,
    removeUser,
    getUsers,
    hasUser
};
