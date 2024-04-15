<script setup lang="ts">
import { useSocketIOStore } from '@/stores/socket_io';

const { chatToGameRoom } = useSocketIOStore();

const handleClick = () => {
  const roomId = prompt('Enter the room ID');
  if (roomId) {
    chatToGameRoom(roomId, 'Hello, room!');
  } else {
    alert('Please enter a room ID');
  }
};
</script>

<template>
  <button type="button" class="button" @click="handleClick">chat</button>
</template>

<style scoped>
.button {
  background-color: red;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px; /* rounded */
  box-shadow: 0 3px #999;

  /* hover effect */
  transition-duration: 0.4s;
  &:hover {
    background-color: #45a049;
    box-shadow: 0 9px #666;
  }

  /* click effect */
  &:active {
    background-color: #3e8e41;
    box-shadow: 0 5px #666;
    transform: translateY(4px);
  }
}
</style>
