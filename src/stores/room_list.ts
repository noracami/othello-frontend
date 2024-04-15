import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useRoomListStore = defineStore('room_list', () => {
  const available_rooms = ref<any>([]);
  const subscribed_rooms = ref<any>([]);

  return { available_rooms, subscribed_rooms };
});
