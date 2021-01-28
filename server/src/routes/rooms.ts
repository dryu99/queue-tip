import express from 'express';
import RoomManager from '../services/RoomManager';
import { parseObject, parseString, toCleanRoom, toNewRoom } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    return res.json(RoomManager.getAllRooms());
  } catch (e) {
    const error = e as Error;
    return res.status(400).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const room = RoomManager.getRoom(req.params.id);
    const cleanRoom = toCleanRoom(room);
    return res.json(cleanRoom);
  } catch (e) {
    const error = e as Error;
    return res.status(404).json({ error: error.message });
  }
});

router.post('/', (req, res) => {
  try {
    const newRoom = toNewRoom(req.body);
    const room = RoomManager.addRoom(newRoom);

    const cleanRoom = toCleanRoom(room);
    return res.status(201).json(cleanRoom);
  } catch (e) {
    const error = e as Error;
    return res.status(400).json({ error: error.message });
  }
});

router.post('/check-admin-password', (req, res) => {
  try {
    const body = parseObject(req.body);

    const adminPassword = parseString(body.adminPassword);
    const roomId = parseString(body.roomId);

    const room = RoomManager.getRoom(roomId);

    if (!room.checkAdminPassword(adminPassword)) {
      return res.status(401).json({ error: 'Given admin password is invalid.' });
    }

    return res.json({ message: 'Given admin password is valid' });
  } catch (e) {
    const error = e as Error;
    return res.status(400).json({ error: error.message });
  }

});

export default router;