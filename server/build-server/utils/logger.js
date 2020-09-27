"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roomService_1 = __importDefault(require("../services/roomService"));
const userService_1 = __importDefault(require("../services/userService"));
/* eslint-disable @typescript-eslint/no-explicit-any */
const info = (...params) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(...params);
    }
};
const event = (...params) => {
    info('<EV> ', params);
};
const error = (...params) => {
    console.error('<ER>', ...params);
};
const printAppState = () => {
    info('--- SERVER STATE ---');
    info('USERS:', userService_1.default.getUsers());
    info('ROOMS: ', roomService_1.default.getAllRooms().map(r => ({
        id: r.id,
        name: r.name,
        adminPassword: r.adminPassword,
        queue: r.queue.map(u => `${u.name}`),
    })));
    info('--------------------');
};
exports.default = { info, event, error, printAppState };
