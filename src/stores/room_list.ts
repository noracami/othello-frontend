import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { AckEvent, Room, RoomProps } from '@/models/Room';

export const useRoomListStore = defineStore('room_list', () => {
  const available_rooms = ref<Room[]>([]);
  const subscribed_rooms = ref<Room[]>([]);

  const addAvailableRoom = ({ roomName, roomId }: Room) => {
    available_rooms.value.push({
      roomName,
      roomId,
      unsubscribeCallback: () => {
        unsubscribeGameRoom(roomId);
      }
    });
  };

  const addSubscribedRoom = ({ roomName, roomId }: Room) => {
    subscribed_rooms.value.push({
      roomName,
      roomId,
      unsubscribeCallback: () => {
        unsubscribeGameRoom(roomId);
      }
    });
  };

  const roomCreatedHandler = ({ room_name: roomName, room_id: roomId }: RoomProps) => {
    console.group('room:created');
    console.log('roomName:', roomName);
    console.log('roomId:', roomId);
    console.groupEnd();

    addAvailableRoom({ roomName, roomId });
  };

  const roomCreatedAckHandler = (e: AckEvent) => {
    console.group('room:created:ack');
    console.log('raw data:', e);

    console.log('status_code:', e.status_code);
    console.log('message:', e.message);
    console.log('data:', e.data);
    console.groupEnd();

    if (e.status_code === 201) {
      const { room_name: roomName, room_id: roomId } = e.data;
      addSubscribedRoom({ roomName, roomId });
    }
  };

  const roomSubscribedAckHandler = (e: AckEvent) => {
    // console.warn('room:subscribed:ack');
    console.group('room:subscribed:ack');
    console.log('raw data:', e);

    console.log('status_code:', e.status_code);
    console.log('message:', e.message);
    console.log('data:', e.data);
    console.groupEnd();
  };

  const unsubscribeGameRoom = (roomId: string) => {
    console.warn('mock unsubscribeGameRoom');
    // TODO: implement socket.io logic
    // client will be leave the room

    const room = subscribed_rooms.value.find((room: Room) => room.roomId === roomId);
    if (!room) {
      console.error('room not found:', roomId);
      return;
    }

    subscribed_rooms.value = subscribed_rooms.value.filter((room: Room) => room.roomId !== roomId);
    available_rooms.value.push(room);
  };

  return {
    available_rooms,
    subscribed_rooms,
    roomCreatedHandler,
    roomCreatedAckHandler,
    roomSubscribedAckHandler
  };
});
