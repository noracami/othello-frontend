<script setup lang="ts">
import GameRoomLink from '@/components/GameRoomLink.vue';
import { useRoomListStore } from '@/stores/room_list';
import { storeToRefs } from 'pinia';

defineProps<{
  msg?: string;
}>();

const roomListStore = useRoomListStore();
const { subscribed_rooms } = storeToRefs(roomListStore);
</script>

<template>
  <template v-if="subscribed_rooms.length > 0">
    <div class="subscribed-rooms">
      <GameRoomLink
        v-for="{ roomName, roomId, unsubscribeCallback } of subscribed_rooms"
        :key="roomId"
        :url="`/room/${roomId}`"
        :text="roomName"
        :removable="true"
        :unsubscribeCallback="unsubscribeCallback"
      />
    </div>
  </template>
</template>

<style scoped>
.subscribed-rooms {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  > a {
    font-size: 1.5rem;
  }
}
</style>
