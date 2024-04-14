<script setup lang="ts">
defineProps<{
  msg?: string;
}>();
</script>

<template>
  <div class="game-board">棋盤</div>
</template>

<style scoped>
.game-board {
  border: 1px solid #f00;
  width: 100%;
  min-height: 60%;
  margin: 1rem;
}
</style>
