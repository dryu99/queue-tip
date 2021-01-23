import Room from './Room';
import { nanoid } from 'nanoid';
import { NewRoom, IRoom } from '../types';

export default class RoomManager {
  // We cache live room metadata in this map so new clients can init their rooms properly.
  // key = id, val = Room
  private rooms: Map<string, Room>;

  constructor() {
    this.rooms = new Map<string, Room>();
  }

  public getRoom(id: string): IRoom {
    if (!this.rooms.has(id)) {
      throw new Error(`room ${id} doesn't exist`);
    }
    return (this.rooms.get(id) as Room).toJSON(); // TODO change signature to Room | null
  }

  public getAllRooms(): IRoom[] {
    return Array.from(this.rooms.values()).map(room => room.toJSON());
  }

  public addRoom(newRoom: NewRoom): IRoom {
    const newId = nanoid(8);

    if (this.rooms.has(newId)) {
      throw new Error('Trying to add room but id already exists, uuid fudged up or sth else went wrong.');
    }

    const room = new Room(newId, newRoom.name, newRoom.adminPassword);
    this.rooms.set(room.id, room);
    return room.toJSON();
  }

  // TODO change output to boolean
  public removeRoom(id: string): void {
    if (!this.rooms.has(id)) {
      throw new Error(`room ${id} doesn't exist`);
    }

    this.rooms.delete(id);
  }
}