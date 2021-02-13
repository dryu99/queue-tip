import { Document } from 'mongoose';

export enum SocketEvents {
  JOIN = 'join',
  LEAVE = 'leave',
  CREATE_ROOM = 'create_room',
  CONNECT = 'connect',
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',
  DISCONNECTING = 'disconnecting',
  ENQUEUE = 'enqueue',
  DEQUEUE = 'dequeue',
  TRY_ADMIN_STATUS = 'try_admin_status'
}

export interface UserBase {
  name: string,
  isAdmin: boolean
}

// ids are generated on server which is why they're not part of NewUser
export interface User extends UserBase {
  id: string
}
export type NewUser = UserBase;
export interface CleanUser extends UserBase {
  id: string
}
export interface RoomBase {
  name: string,
}

// TODO delete this type, and delete toJSON method in Room
export interface IRoom extends RoomBase {
  id: string,
  users: User[] // TODO consider making this a Map<userid,User>
  queue: User[],
  adminPassword: string
  // userCount: number
  // owner: string
}

export interface NewRoom extends RoomBase {
  adminPassword: string
}

// Room that is safe to send back to client; no need to pass entire queue back and forth
export interface CleanRoom extends RoomBase {
  id: string
  userCount: number
}

export interface MongoRoom extends Document, RoomBase {

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AcknowledgementCallback = (object: any) => void;

export type EventData = Record<string, unknown>;

export interface JoinEmitResponseData {
  user: User,
  queue: User[],
  userCount: number,
  error: string
}

export interface JoinOnResponseData {
  newUser: User
}

export interface JoinRequestData {
  roomId: string,
  newUser?: NewUser
}