<script setup lang="ts">
import { onMounted } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

import RoomGameBoard from '@/components/room/RoomGameBoard.vue';
import RoomChat from '@/components/room/RoomChat.vue';
import RoomFooter from '@/components/room/RoomFooter.vue';
import RoomPlayerCard from '@/components/room/RoomPlayerCard.vue';

// preparation on enter room
// 1. check if the room is existed
// 2. try to subscribe the room
// 3. render the room latest state from the api server
// 4. listen to the room state changes from the socket.io server and update the room state
// 5. client take actions and send to the server by socket.io

// available ui-actions in the room
// join the game
// leave the game
// chat -- send messages to the room
// ready
// place the piece
// surrender

// available game-actions in the room (received from the socket.io server)
// show chat message from other players
// show game message from the server
// piece placed
// piece flipped

onMounted(() => {
  console.log('onMounted:', useRoute().params);
});

onBeforeRouteUpdate(async (to, from) => {
  //仅当 id 更改时才获取用户，例如仅 query 或 hash 值已更改
  if (to.params.id !== from.params.id) {
    // const answer = window.confirm('Do you really want to leave? you have unsaved changes!');
    // // 取消导航并停留在同一页面上
    // if (!answer) return false;
    console.log('onBeforeRouteUpdate:', 'to:', to.params, 'from:', from.params);
  }
});
</script>

<template>
  <div class="room">
    <div class="panel left-panel">
      <RoomGameBoard></RoomGameBoard>
      <RoomPlayerCard side="black"></RoomPlayerCard>
      <RoomPlayerCard side="white"></RoomPlayerCard>
    </div>
    <div class="panel right-panel">
      <RoomChat></RoomChat>
    </div>
    <footer>
      <RoomFooter></RoomFooter>
    </footer>
  </div>
</template>

<style scoped>
.left-panel {
  grid-column: span 3fr;
  background-color: #f0f0f0;
  display: flex;
  flex-wrap: wrap;
}
.right-panel {
  grid-column: span 1fr;
  background-color: steelblue;
  display: flex;
  flex-direction: column;
}
@media (min-width: 1024px) {
  .room {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: 90% 10%;
    background-color: wheat;
    color: black;
  }
}
</style>
