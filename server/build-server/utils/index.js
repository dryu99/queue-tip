"use strict";
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseObject = exports.parseString = exports.toNewUser = exports.toUser = exports.toCleanRoom = exports.toNewRoom = void 0;
exports.toNewRoom = (object) => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return {
        name: exports.parseString(object.name),
        adminPassword: exports.parseString(object.adminPassword),
    };
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};
exports.toCleanRoom = (object) => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return {
        id: exports.parseString(object.id),
        name: exports.parseString(object.name),
        userCount: parseNumber(object.users.length),
    };
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};
exports.toUser = (object) => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return {
        id: exports.parseString(object.id),
        name: exports.parseString(object.name),
        isAdmin: parseBoolean(object.isAdmin)
    };
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};
// we pass in id
exports.toNewUser = (object) => {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return {
        name: exports.parseString(object.name),
        isAdmin: parseBoolean(object.isAdmin)
    };
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};
exports.parseString = (str) => {
    if (!str || !isString(str)) {
        throw new Error(`Expected string but got: ${str}`);
    }
    return str;
};
exports.parseObject = (obj) => {
    if (!isObject(obj)) {
        throw new Error(`Expected object but got: ${obj}`);
    }
    return obj;
};
const parseBoolean = (bool) => {
    if (!isBoolean(bool)) {
        throw new Error(`Expected boolean but got: ${bool}`);
    }
    return bool;
};
const parseNumber = (num) => {
    if (!isNumber(num)) {
        throw new Error(`Expected number but got: ${num}`);
    }
    return num;
};
const isString = (val) => {
    return typeof val === 'string' || val instanceof String;
};
const isBoolean = (val) => {
    return typeof val === 'boolean' || val instanceof Boolean;
};
const isNumber = (val) => {
    return typeof val === 'number' || val instanceof Number;
};
const isObject = (val) => {
    return typeof val === 'object';
};
