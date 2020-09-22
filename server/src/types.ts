export enum UserTypes {
  ADMIN = 'admin',
  BASIC = 'basic'
}

export interface User {
  id: string,
  name: string,
  socketId: string,
  roomId: string,
  type: UserTypes
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

}
