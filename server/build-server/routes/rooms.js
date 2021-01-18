"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomService_1 = __importDefault(require("../services/roomService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    try {
        return res.json(roomService_1.default.getAllRooms());
    }
    catch (e) {
        const error = e;
        return res.status(400).json({ error: error.message });
    }
});
router.get('/:id', (req, res) => {
    try {
        const room = roomService_1.default.getRoom(req.params.id);
        const cleanRoom = utils_1.toCleanRoom(room);
        return res.json(cleanRoom);
    }
    catch (e) {
        const error = e;
        return res.status(404).json({ error: error.message });
    }
});
router.post('/', (req, res) => {
    try {
        const newRoom = utils_1.toNewRoom(req.body);
        const room = roomService_1.default.addRoom(newRoom);
        const cleanRoom = utils_1.toCleanRoom(room);
        return res.status(201).json(cleanRoom);
    }
    catch (e) {
        const error = e;
        return res.status(400).json({ error: error.message });
    }
});
router.post('/check-admin-password', (req, res) => {
    try {
        const body = utils_1.parseObject(req.body);
        const adminPassword = utils_1.parseString(body.adminPassword);
        const roomId = utils_1.parseString(body.roomId);
        if (!roomService_1.default.checkAdminPassword(adminPassword, roomId)) {
            return res.status(401).json({ error: 'Given admin password is invalid.' });
        }
        return res.json({ message: 'Given admin password is valid' });
    }
    catch (e) {
        const error = e;
        return res.status(400).json({ error: error.message });
    }
});
exports.default = router;
