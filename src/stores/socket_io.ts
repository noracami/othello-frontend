import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import io from 'socket.io-client';

// mock function store
import { useMockFunctionStore } from './mock_function';

export const useSocketIOStore = defineStore('sio', () => {
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
    sio.value.on('message', (message: any) => {
      console.log('socket.io message:', message);
    });
    // sio.value.on('*', (event: any) => {
    //   console.log('socket.io event:', event);
    // });
  };

  const chatToLobby = (message: string = 'no message') => {
    if (!sio.value) {
      console.error('socket.io not connected');
      return;
    }

    sio.value.emit('chat_to_lobby', message);
  };

  const createGameRoom = () => {
    return useMockFunctionStore().createGameRoom();

    // if (!sio.value) {
    //   console.error('socket.io not connected');
    //   return;
    // }
    // sio.value.emit('create_game_room');
  };

  const subscribeGameRoom = (room: string) => {
    return useMockFunctionStore().subscribeGameRoom(room);
    // if (!sio.value) {
    //   console.error('socket.io not connected');
    //   return;
    // }
    // sio.value.emit('join_game_room', room);
  };

  const unsubscribeGameRoom = (room: string) => {
    return useMockFunctionStore().unsubscribeGameRoom(room);
    // if (!sio.value) {
    //   console.error('socket.io not connected');
    //   return;
    // }
    // sio.value.emit('leave_game_room', room);
  };

  const sid = computed(() => sio.value?.id);

  return {
    sio,
    handleConnect,
    chatToLobby,
    createGameRoom,
    subscribeGameRoom,
    unsubscribeGameRoom,
    sid
  };
});
