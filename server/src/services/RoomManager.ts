import { nanoid } from 'nanoid';
import MongoRoom from '../models/MongoRoom';
import Room from '../models/Room';
import { NewRoom } from '../types';
import logger from '../utils/logger';

// singleton room manager
export default (function() {
  // this map contains additional metadata not found in socket.io rooms
  // key = id, val = Room
  const _rooms = new Map<string, Room>();

  const addRoom = (newRoom: NewRoom): Room => {
    const newId = nanoid(8);

    if (_rooms.has(newId)) {
      throw new Error('Trying to add room but id already exists, uuid fudged up or sth else went wrong.');
    }

    // save room in memory
    const room = new Room(newId, newRoom.name, newRoom.adminPassword);
    _rooms.set(room.id, room);

    // save room in db
    _saveRoomInDatabase(room);

    return room;
  };

  const getRoom = (id: string): Room => {
    if (!_rooms.has(id)) {
      throw new Error(`room ${id} doesn't exist`);
    }
    return _rooms.get(id) as Room; // TODO change signature to Room | null
  };

  const getAllRooms = (): Room[] => {
    return Array.from(_rooms.values());
  };

  // TODO change output to boolean
  const removeRoom = (id: string) => {
    if (!_rooms.has(id)) {
      throw new Error(`room ${id} doesn't exist`);
    }

    _updateRoomInDatabase(id);

    // delete room from memory
    _rooms.delete(id);
  };

  const clear = () => {
    _rooms.clear();
  };

  // TODO make another abstraction for db fns
  const _saveRoomInDatabase = (room: Room) => {
    const mongoRoom = new MongoRoom({
      id: room.id,
      name: room.name,
      totalUsersJoined: room.totalUsersJoined
    });

    mongoRoom.save()
      .then(() => logger.info(`Room '${room.name}' saved to database.`))
      .catch(() => logger.error(`Room '${room.name}' couldn't be saved to database.`));
  };

  const _updateRoomInDatabase = (id: string) => {
    const room = _rooms.get(id) as Room;
    const updatedRoomData = {
      totalUsersJoined: room.totalUsersJoined
    };

    // can't find by mongo id b/c we don't save mongo id in memory
    MongoRoom.findOneAndUpdate({ id }, updatedRoomData)
      .then(() => logger.info(`Room '${room.name}' updated in database.`))
      .catch(() => logger.error(`Room '${room.name}' couldn't be updated to database.`));
  };

  return {
    addRoom,
    removeRoom,
    getRoom,
    getAllRooms,
    clear
  };
}());
