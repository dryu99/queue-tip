"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    console.error(...params);
};
exports.default = { info, event, error };
