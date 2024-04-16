import io from 'socket.io-client';
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useRoomListStore } from '@/stores/room_list';

// mock function store
import { useMockFunctionStore } from './mock_function';
import type { Socket } from 'node_modules/socket.io-client/build/cjs';

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

    // listen if room is created
    sio.value.on('room:created', (room: any) => {
      console.group('room:created');
      console.log('room:', room);
      console.groupEnd();

      const { room_name: roomName, room_id: roomId } = room;
      try {
        if (roomName === undefined) throw new Error('roomName is undefined');
        if (roomId === undefined) throw new Error('roomId is undefined');
      } catch (error) {
        // do something
        console.error(error);
        return;
      }

      const roomListStore = useRoomListStore();
      roomListStore.addAvailableRoom({ roomName, roomId });
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

    (sio.value as Socket).emit('chat_to_lobby', message);
  };

  const chatToGameRoom = (room: string, message: string = 'no message') => {
    if (!sio.value) {
      console.error('socket.io not connected');
      return;
    }

    const payload = {
      room_id: room,
      message: message
    };

    sio.value.emit('room:chat', payload, (val: any) => {
      console.group('exec chat_to_game_room response');
      console.log('response type:', typeof val);
      console.log('response:', val);
      console.groupEnd();
    });
  };

  const createGameRoom = () => {
    // return useMockFunctionStore().createGameRoom();

    if (!sio.value) {
      console.error('socket.io not connected');
      return;
    }

    sio.value.emit('chat_to_lobby', 'message from createGameRoom');

    sio.value.emit('room:create', (val: any) => {
      console.group('exec room:create response');
      console.log('response type:', typeof val);
      console.log('response:', val);
      console.groupEnd();
    });

    console.log('exec room:create done');
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
    chatToGameRoom,
    createGameRoom,
    subscribeGameRoom,
    unsubscribeGameRoom,
    sid
  };
});
