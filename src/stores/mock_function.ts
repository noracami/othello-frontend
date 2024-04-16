import { defineStore, storeToRefs } from 'pinia';

import { useRoomListStore } from '@/stores/room_list';

export const useMockFunctionStore = defineStore('mock_function', () => {
  const roomListStore = useRoomListStore();
  const { available_rooms, subscribed_rooms } = storeToRefs(roomListStore);

  const createGameRoom = () => {
    console.warn('mock createGameRoom');

    const CITIES = [
      'New York',
      'Los Angeles',
      'Chicago',
      'Houston',
      'Phoenix',
      'Philadelphia',
      'San Antonio',
      'San Diego',
      'Dallas',
      'San Jose',
      'Austin',
      'Jacksonville',
      'Fort Worth',
      'Columbus',
      'San Francisco'
    ];
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const randomString = (length: Number = 20) =>
      Array.from(
        Array(length),
        () => randomChars[Math.floor(Math.random() * randomChars.length)]
      ).join('');

    const roomName = CITIES[Math.floor(Math.random() * CITIES.length)];
    const roomId = randomString(20);

    available_rooms.value.push({
      roomName,
      roomId,
      unsubscribeCallback: () => {
        unsubscribeGameRoom(roomId);
      }
    });

    return;
  };

  const subscribeGameRoom = (roomId: string) => {
    console.warn('mock subscribeGameRoom');

    const room = available_rooms.value.find((room: any) => room.roomId === roomId);
    if (!room) {
      console.error('room not found:', roomId);
      return;
    }

    available_rooms.value = available_rooms.value.filter((room: any) => room.roomId !== roomId);
    subscribed_rooms.value.push(room);

    return;
  };

  const unsubscribeGameRoom = (roomId: string) => {
    console.warn('mock unsubscribeGameRoom');

    const room = subscribed_rooms.value.find((room: any) => room.roomId === roomId);
    if (!room) {
      console.error('room not found:', roomId);
      return;
    }

    subscribed_rooms.value = subscribed_rooms.value.filter((room: any) => room.roomId !== roomId);
    available_rooms.value.push(room);

    return;
  };

  return { createGameRoom, subscribeGameRoom, unsubscribeGameRoom };
});
