import { describe, beforeEach, expect, test } from '@jest/globals';
import RoomManager from '../src/services/RoomManager';

describe('RoomManager unit tests', () => {

  beforeEach(() => {
    // reset room manager before each test
    RoomManager.clear();
  });

  test('putRoom: create a new room', () => {
    // // setup
    // const sampleRoomData = {
    //   id: 'id1',
    //   name: 'room 1'
    // };

    // // const expectedRoomData = {

    // // }

    // // call
    // roomService.createRoom(sampleRoomData);

    // // assert
    // const room = roomService.getRoom('id1');
    // expect(room).toBe(sampleRoomData);
  });

  test('basic', () => {
    expect(0).toBe(0);
  });
});

