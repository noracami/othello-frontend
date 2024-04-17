type Room = { roomName: string; roomId: string; unsubscribeCallback?: () => void };
type RoomProps = { room_name: string; room_id: string; unsubscribeCallback?: () => void };

type AckEvent = { status_code: number; message: string; data: any };

export type { Room, RoomProps, AckEvent };
