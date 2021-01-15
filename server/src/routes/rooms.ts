import express from 'express';
import roomService from '../services/roomService';
import { parseObject, parseString, toCleanRoom, toNewRoom } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  try {
    return res.json(roomService.getAllRooms());
  } catch (e) {
    const error = e as Error;
    return res.status(400).json({ error: error.message });
  }
});

router.get('/:id', (req, res) => {
  try {
    const room = roomService.getRoom(req.params.id);
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
    const room = roomService.addRoom(newRoom);

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

    if (!roomService.checkAdminPassword(adminPassword, roomId)) {
      return res.status(401).json({ error: 'Given admin password is invalid.' });
    }

    return res.json({ message: 'Given admin password is valid' });
  } catch (e) {
    const error = e as Error;
    return res.status(400).json({ error: error.message });
  }

});

export default router;