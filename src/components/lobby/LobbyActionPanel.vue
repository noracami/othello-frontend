<script setup lang="ts">
import CreateRoomButton from '@/components/CreateRoomButton.vue';
import ChatButton from '../ChatButton.vue';
defineProps<{
  msg?: string;
}>();
</script>

<template>
  <div class="wrapper">
    <h2>Action Panel</h2>
    <CreateRoomButton />
    <ChatButton />
  </div>
</template>

<style scoped>
h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.wrapper {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
