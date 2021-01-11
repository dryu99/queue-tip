"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roomService_1 = __importDefault(require("../services/roomService"));
// import userService from '../services/userService';
/* eslint-disable @typescript-eslint/no-explicit-any */
const info = (...params) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(...params);
    }
};
const event = (...params) => {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const dateTime = date + ' ' + time;
    info(`<EV> ${dateTime}`, params);
};
const error = (...params) => {
    console.error('<ER>', ...params);
};
const printAppState = () => {
    info('--- SERVER STATE ---');
    info('ROOMS: ', roomService_1.default.getAllRooms().map(r => ({
        id: r.id,
        name: r.name,
        users: r.users.map(u => u.name),
        adminPassword: r.adminPassword,
        queue: r.queue.map(u => u.name)
    })));
};
exports.default = { info, event, error, printAppState };
