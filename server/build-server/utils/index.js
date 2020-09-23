"use strict";
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSocketData = exports.toSocketRoomData = exports.toCleanUser = exports.toNewUser = exports.toNewRoom = void 0;
const types_1 = require("../types");
exports.toNewRoom = (object) => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return {
        name: parseString(object.name, 'NewRoom', 'name'),
    };
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};
exports.toNewUser = (object) => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return {
        // id: parseString(object.id, 'NewUser', 'id'),
        name: parseString(object.name, 'NewUser', 'name'),
        roomId: parseString(object.roomId, 'NewUser', 'roomId'),
        type: parseUserType(object.type)
    };
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};
exports.toCleanUser = (object) => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return {
        id: parseString(object.id, 'CleanUser', 'id'),
        roomId: parseString(object.roomId, 'CleanUser', 'roomId'),
        name: parseString(object.name, 'CleanUser', 'name'),
        type: parseUserType(object.type)
    };
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};
exports.toSocketRoomData = (object) => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return {
        roomId: parseString(object.roomId, 'SocketRoomData', 'roomId'),
    };
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};
exports.toSocketData = (object) => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return {
        roomId: parseString(object.roomId, 'SocketData', 'roomId'),
        userId: parseString(object.userId, 'SocketData', 'userId')
    };
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};
const parseString = (str, modelName, propName) => {
    if (!str || !isString(str)) {
        throw new Error(`${modelName} ${propName} is missing or invalid: ${str}`);
    }
    return str;
};
const parseUserType = (userType) => {
    if (!userType || !isUserType(userType)) {
        throw new Error('NewUser is missing or invalid: type');
    }
    return userType;
};
const isUserType = (val) => {
    return Object.values(types_1.UserType).includes(val);
};
const isString = (val) => {
    return typeof val === 'string' || val instanceof String;
};
