<script setup lang="ts">
import LobbyActionPanel from '@/components/lobby/LobbyActionPanel.vue';
import AvailableRoom from '@/components/AvailableRoom.vue';

// preparation on enter room
// 1. render the lobby latest state from the api server
// 2. listen to the lobby state changes from the socket.io server and update the room state

// available ui-actions in the lobby
// chat -- send messages to the lobby
// create room -- create a new room
// join room -- join a room

// available reactions in the lobby (received from the socket.io server)
// show chat message from other players
// show server message from the server
</script>

<template>
  <main>
    <div class="title">
      <h1>Game Lobby</h1>
    </div>
    <LobbyActionPanel />
    <AvailableRoom />
  </main>
</template>

<style scoped>
.title {
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
}
</style>
