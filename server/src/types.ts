export enum SocketEvents {
  JOIN = 'join',
  CREATE_ROOM = 'create_room',
  DISCONNECT = 'disconnect',
  LEAVE = 'leave',
  NEW_USER_JOIN = 'new_user_join',
  ROOM_CHECK = 'room_check',
  ENQUEUE = 'enqueue',
  DEQUEUE = 'dequeue',
  UPDATE_USER = 'update_user',
  TRY_ADMIN_STATUS = 'try_admin_status'
}

export enum UserType {
  ADMIN = 'admin',
  BASIC = 'basic'
}

export interface UserBase {
  roomId: string,
}

export interface User extends UserBase {
  name: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewUser extends UserBase {

}

export interface RoomBase {
  name: string,
  adminPassword: string
}

export interface Room extends RoomBase {
  id: string,
  queue: User[],
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NewRoom extends RoomBase {
// TODO new room shouldnt have id
}

export interface CleanRoom extends RoomBase {
  id: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AcknowledgementCallback = (object: any) => void;

export interface SocketRoomData {
  roomId: string,
}

export interface SocketData extends SocketRoomData {
  userId: string
}