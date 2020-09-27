"use strict";
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSocketData = exports.toNewUser = exports.toUser = exports.toCleanRoom = exports.toNewRoom = void 0;
const logger_1 = __importDefault(require("./logger"));
exports.toNewRoom = (object) => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return {
        name: parseString(object.name, 'NewRoom', 'name'),
        adminPassword: parseString(object.adminPassword, 'NewRoom', 'adminPassword'),
    };
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};
exports.toCleanRoom = (object) => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return {
        id: parseString(object.id, 'CleanRoom', 'id'),
        name: parseString(object.name, 'CleanRoom', 'name')
    };
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};
exports.toUser = (object) => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return {
        name: parseString(object.name, 'User', 'name'),
        roomId: parseString(object.roomId, 'User', 'roomId'),
    };
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};
exports.toNewUser = (object) => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return {
        roomId: parseString(object.roomId, 'NewUser', 'roomId'),
    };
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};
exports.toSocketData = (object) => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return {
        username: unstrictParseString(object.username, 'SocketData', 'username'),
        roomId: unstrictParseString(object.roomId, 'SocketData', 'roomId'),
        adminPassword: unstrictParseString(object.adminPassword, 'SocketData', 'adminPassword'),
    };
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};
const unstrictParseString = (str, modelName, propName) => {
    if (!str || !isString(str)) {
        logger_1.default.info(`(unstrict parse) ${modelName} ${propName} is missing or invalid: ${str}`);
        return undefined;
    }
    return str;
};
const parseString = (str, modelName, propName) => {
    if (!str || !isString(str)) {
        throw new Error(`${modelName} ${propName} is missing or invalid: ${str}`);
    }
    return str;
};
const isString = (val) => {
    return typeof val === 'string' || val instanceof String;
};
