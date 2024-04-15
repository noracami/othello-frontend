<script setup lang="ts">
import GameRoomLink from '@/components/GameRoomLink.vue';
import { useRoomListStore } from '@/stores/room_list';
import { storeToRefs } from 'pinia';

defineProps<{
  msg?: string;
}>();

const roomListStore = useRoomListStore();
const { available_rooms } = storeToRefs(roomListStore);
</script>

<template>
  <div class="wrapper">
    <h2>Available Rooms</h2>
    <template v-if="available_rooms.length > 0">
      <div class="available-rooms">
        <GameRoomLink
          v-for="{ roomName, roomId } of available_rooms"
          :key="roomId"
          :url="`/room/${roomId}?subscribe=true`"
          :text="roomName"
          :removable="false"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.available-rooms {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  > a {
    font-size: 1.5rem;
  }
}
.wrapper {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
