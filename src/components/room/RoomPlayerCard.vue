<script setup lang="ts">
defineProps<{
  side: 'black' | 'white';
}>();
</script>

<template>
  <div class="player">
    <p>{{ side }}</p>
    <p>棋子數目</p>
  </div>
</template>

<style scoped>
.player {
  width: 50%;
  border: 1px solid #0f0;
}
</style>
