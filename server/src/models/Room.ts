import {  IRoom, User } from '../types';

export default class Room {
  id: string;
  name: string;
  adminPassword: string;
  users: User[];
  queue: User[];

  constructor(id: string, name: string, adminPassword: string) {
    this.id = id;
    this.name = name;
    this.adminPassword = adminPassword;
    this.users = [];
    this.queue = [];
  }

  public addUser(user: User): void {
    // don't want users with duplicate names or ids in room
    const index = this.users.findIndex(u =>
      u.name.toLowerCase() === user.name.toLowerCase()
      || u.id === user.id
    );

    if (index !== -1) {
      throw new Error(`there is another user with same name/id as 
      '${user.name}' that already exists in room '${this.name}'; couldn't add`);
    }

    this.users.push(user);
  }

  public removeUser(userId: string): User {
    // remove from users list
    // use id to search b/c we only have access to id when a socket disconnects
    const index = this.users.findIndex(u => u.id === userId);
    if (index === -1) {
      throw new Error(`user with id '${userId}' doesn't exist in room '${this.name}'; couldn't remove user.`);
    }

    const user = this.users.splice(index, 1)[0];
    return user;
  }

  public addQueueUser(user: User): void {
    const index = this.queue.findIndex(u => u.id === user.id);
    if (index !== -1) {
      throw new Error(`there is another user with same id as 
      '${user.name}' that already exists in queue '${this.name}'; couldn't add`);
    }

    this.queue.push(user);
  }

  public removeQueueUser(userId: string): User {
    const index = this.queue.findIndex(u => u.id === userId);
    if (index === -1) {
      throw new Error(`user with id '${userId}' doesn't exist in queue '${this.name}'; couldn't remove user.`);
    }

    const user = this.queue.splice(index, 1)[0];
    return user;
  }

  public checkAdminPassword(passwordAttempt: string): boolean {
    return this.adminPassword === passwordAttempt;
  }

  public toJSON(): IRoom {
    return {
      id: this.id,
      name: this.name,
      adminPassword: this.adminPassword,
      users: this.users,
      queue: this.queue
    };
  }
}