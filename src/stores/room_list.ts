import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useRoomListStore = defineStore('room_list', () => {
  type Room = { roomName: string; roomId: string };
  const available_rooms = ref<Room[]>([]);
  const subscribed_rooms = ref<Room[]>([]);

  const addAvailableRoom = (room: Room) => {
    available_rooms.value.push(room);
  };

  return { available_rooms, subscribed_rooms, addAvailableRoom };
});
