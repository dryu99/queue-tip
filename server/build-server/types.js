"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = exports.SocketEvents = void 0;
var SocketEvents;
(function (SocketEvents) {
    SocketEvents["JOIN"] = "join";
    SocketEvents["CREATE_ROOM"] = "create_room";
    SocketEvents["DISCONNECT"] = "disconnect";
    SocketEvents["LEAVE"] = "leave";
    SocketEvents["NEW_USER_JOIN"] = "new_user_join";
    SocketEvents["ROOM_CHECK"] = "room_check";
    SocketEvents["ENQUEUE"] = "enqueue";
    SocketEvents["DEQUEUE"] = "dequeue";
})(SocketEvents = exports.SocketEvents || (exports.SocketEvents = {}));
var UserType;
(function (UserType) {
    UserType["ADMIN"] = "admin";
    UserType["BASIC"] = "basic";
})(UserType = exports.UserType || (exports.UserType = {}));
