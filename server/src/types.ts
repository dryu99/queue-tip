export enum SocketEvents {
  JOIN = 'join',
  LEAVE = 'leave',
  CREATE_ROOM = 'create_room',
  DISCONNECT = 'disconnect',
  ROOM_CHECK = 'room_check',
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
  id: string,
  roomId: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewUser extends UserBase {

}

// need 2 new user interfaces

export interface RoomBase {
  name: string,
}

export interface Room extends RoomBase {
  id: string,
  queue: User[],
  users: User[],
  adminPassword: string
}

export interface NewRoom extends RoomBase {
  adminPassword: string
}

// Room that is safe to send back to client
export interface CleanRoom extends RoomBase {
  id: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AcknowledgementCallback = (object: any) => void;

// TODO toSocketData could be better if we had multiple types of SocketData and toSocketData util fns, but that didn't feel scalable.
// client data that may or may not contain specified fields
export interface SocketData {
  username?: string,
  roomId?: string,
  adminPassword?: string
}

export type SockData = Record<string, unknown>;