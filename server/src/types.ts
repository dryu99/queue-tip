export enum SocketEvents {
  JOIN = 'join',
  CREATE_ROOM = 'create_room',
  DISCONNECT = 'disconnect',
  LEAVE = 'leave',
  NEW_USER_JOIN = 'new_user_join',
  ROOM_CHECK = 'room_check',
  ENQUEUE = 'enqueue',
  DEQUEUE = 'dequeue',
}

export enum UserType {
  ADMIN = 'admin',
  BASIC = 'basic'
}

export interface UserBase {
  name: string,
  roomId: string,
  type: UserType
}

export interface User extends UserBase {
  id: string,
  socketId: string,
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewUser extends UserBase {
  // TODO new user shouldnt have id
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CleanUser extends UserBase {
  id: string
}

export interface RoomBase {
  id: string,
  name: string
}

export interface Room extends RoomBase {
  users: User[],
  queue: User[]
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewRoom extends RoomBase {
// TODO new room shouldnt have id
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CleanRoom extends RoomBase {

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AcknowledgementCallback = (object: any) => void;

export interface SocketRoomData {
  roomId: string,
}

export interface SocketData extends SocketRoomData {
  userId: string
}