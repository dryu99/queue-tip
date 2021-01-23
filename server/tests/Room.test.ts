import { describe, beforeEach, expect, test } from '@jest/globals';
import Room from '../src/models/Room';
import { User } from '../src/types';

describe('Room unit tests', () => {
  let testRoom: Room;
  let testUser: User;

  beforeEach(() => {
    testRoom = new Room('123', 'CPSC 110 Office Hours', '110');
    expect(testRoom.users).toHaveLength(0);
    expect(testRoom.queue).toHaveLength(0);

    testUser = {
      id: 'abc',
      name: 'Bob',
      isAdmin: true
    };
  });

  test('constructor: validate field setting', () => {
    expect(testRoom.id).toBe('123');
    expect(testRoom.name).toBe('CPSC 110 Office Hours');
    expect(testRoom.adminPassword).toBe('110');
    expect(testRoom.users).toHaveLength(0);
    expect(testRoom.queue).toHaveLength(0);
  });

  test('addUser: success', () => {
    // invoke
    testRoom.addUser(testUser);

    // post-validation
    expect(testRoom.users).toHaveLength(1);
  });

  test('addUser: success with multiple adds', () => {
    // setup
    const testUser2: User = {
      id: 'def',
      name: 'Sam',
      isAdmin: false
    };

    // invoke
    testRoom.addUser(testUser);
    testRoom.addUser(testUser2);

    // post-validation
    expect(testRoom.users).toHaveLength(2);
  });

  test('addUser: fail from duplicate name (case insensitive)', () => {
    // setup
    const testUser2: User = {
      id: 'def',
      name: testUser.name.toLowerCase(),
      isAdmin: false
    };

    // invoke
    testRoom.addUser(testUser);
    expect(() => testRoom.addUser(testUser2)).toThrow();
  });

  test('addUser: fail from duplicate ids', () => {
    // setup
    const testUser2: User = {
      id: testUser.id,
      name: 'Sam',
      isAdmin: false
    };

    // invoke
    testRoom.addUser(testUser);
    expect(() => testRoom.addUser(testUser2)).toThrow();
  });

  test('removeUser: success', () => {
    // setup
    testRoom.addUser(testUser);
    expect(testRoom.users).toHaveLength(1);

    // invoke
    const removedUser = testRoom.removeUser(testUser.id);

    // post-validation
    expect(testRoom.users).toHaveLength(0);
    expect(removedUser).toEqual(testUser);
  });

  test('removeUser: fail b/c given user id does not exist', () => {
    // setup
    testRoom.addUser(testUser);
    expect(testRoom.users).toHaveLength(1);

    // invoke
    expect(() => testRoom.removeUser('abcdef')).toThrow();
  });

  test('addQueueUser: success', () => {
    // invoke
    testRoom.addQueueUser(testUser);

    // post-validation
    expect(testRoom.queue).toHaveLength(1);
  });

  test('addQueueUser: success with multiple adds', () => {
    // setup
    const testUser2: User = {
      id: 'def',
      name: 'Sam',
      isAdmin: false
    };

    // invoke
    testRoom.addQueueUser(testUser);
    testRoom.addQueueUser(testUser2);

    // post-validation
    expect(testRoom.queue).toHaveLength(2);
  });

  test('addQueueUser: fail from duplicate ids', () => {
    // invoke
    testRoom.addQueueUser(testUser);
    expect(() => testRoom.addQueueUser(testUser)).toThrow();
  });

  test('removeQueueUser: success', () => {
    // setup
    testRoom.addQueueUser(testUser);
    expect(testRoom.queue).toHaveLength(1);

    // invoke
    const removedQueueUser = testRoom.removeQueueUser(testUser.id);

    // post-validation
    expect(testRoom.queue).toHaveLength(0);
    expect(removedQueueUser).toEqual(testUser);
  });

  test('removeQueueUser: fail b/c given user id does not exist', () => {
    // setup
    testRoom.addQueueUser(testUser);
    expect(testRoom.queue).toHaveLength(1);

    // invoke
    expect(() => testRoom.removeQueueUser('def')).toThrow();
  });

  test('checkAdminPassword: success', () => {
    expect(testRoom.checkAdminPassword(testRoom.adminPassword)).toBe(true);
  });

  test('checkAdminPassword: fail from unmatched password', () => {
    expect(testRoom.checkAdminPassword('def')).toBe(false);
  });
});

