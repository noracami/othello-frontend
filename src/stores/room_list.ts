import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useRoomListStore = defineStore('room_list', () => {
  type Room = { roomName: string; roomId: string; unsubscribeCallback: () => void };
  const available_rooms = ref<Room[]>([]);
  const subscribed_rooms = ref<Room[]>([]);

  const addAvailableRoom = (roomName: string, roomId: string) => {
    available_rooms.value.push({
      roomName,
      roomId,
      unsubscribeCallback: () => {
        unsubscribeGameRoom(roomId);
      }
    });
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

  return { available_rooms, subscribed_rooms, addAvailableRoom };
});
