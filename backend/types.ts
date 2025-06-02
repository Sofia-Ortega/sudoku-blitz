interface IUser {
  socketId: string;
  nickname: string;
  score: number;
}

interface IRoomMetadata {
  hostSocketId: string;
  users: Set<IUser>;
}

type IRooms = Record<string, IRoomMetadata>;

type ICreateRoomCallback = (response: { roomId: string }) => void;

type IJoinRoomCallback = (
  response:
    | { success: true; users: Set<IUser> }
    | { success: false; error: string }
) => void;
