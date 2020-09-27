"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketEvents = void 0;
var SocketEvents;
(function (SocketEvents) {
    SocketEvents["JOIN"] = "join";
    SocketEvents["CREATE_ROOM"] = "create_room";
    SocketEvents["DISCONNECT"] = "disconnect";
    SocketEvents["ROOM_CHECK"] = "room_check";
    SocketEvents["ENQUEUE"] = "enqueue";
    SocketEvents["DEQUEUE"] = "dequeue";
    SocketEvents["TRY_ADMIN_STATUS"] = "try_admin_status";
})(SocketEvents = exports.SocketEvents || (exports.SocketEvents = {}));
