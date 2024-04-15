<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useSocketIOStore } from '@/stores/socket_io';
import SubscribedRoom from './components/SubscribedRoom.vue';
const { handleConnect } = useSocketIOStore();

const rooms = ref<{ name: string; id: string }[]>([]);

onMounted(() => {
  handleConnect();
});

nextTick(() => {
  rooms.value = [
    { id: '1', name: '房間1' },
    { id: '2', name: '房間2' },
    { id: '3', name: '房間3' }
  ];
});
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">大廳</RouterLink>
        <SubscribedRoom />
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  display: flex;
  font-size: 2rem;
  text-align: center;
  justify-content: center;
  gap: 1rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

@media (min-width: 1024px) {
  nav {
    gap: 0;
    flex-direction: column;
    padding-top: 5rem;
  }
}
</style>
