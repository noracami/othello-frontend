<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

import io from 'socket.io-client';
const sio = ref<any>(null);
const SOCKET_IO_SERVER = import.meta.env.VITE_SOCKET_IO_SERVER as string;
const handleConnect = () => {
  if (sio.value) {
    console.log('socket.io already connected');
    console.log('socket.io id:', sio.value.id);
    return;
  }

  sio.value = io(SOCKET_IO_SERVER, { transports: ['websocket', 'polling'] });
  sio.value.on('connect', () => {
    console.log('socket.io connected');
  });
  sio.value.on('disconnect', () => {
    console.log('socket.io disconnected');
  });
  sio.value.on('error', (error: any) => {
    console.error('socket.io error:', error);
  });
  sio.value.on('*', (event: any) => {
    console.log('socket.io event:', event);
  });
};

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
        <RouterLink to="/about">大廳</RouterLink>
        <RouterLink v-for="{ name, id } of rooms" :key="id" :to="`/room/${id}`">{{
          name
        }}</RouterLink>
        <RouterLink to="/">Home</RouterLink>
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
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  font-size: 2rem;
  text-align: center;
  padding-top: 5rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

@media (min-width: 768px) {
  nav {
    min-height: fit-content;
  }
}
</style>
