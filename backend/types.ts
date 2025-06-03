interface IUser {
  socketId: string;
  nickname: string;
  score: number;
}

interface IRoomMetadata {
  hostSocketId: string;
  users: IUser[];
}

type IRooms = Record<string, IRoomMetadata>;

type ICreateRoomCallback = (response: { roomId: string }) => void;

type IJoinRoomCallback = (
  response:
    | { success: true; users: IUser[] }
    | { success: false; error: string }
) => void;

type IStartGameCallback = (response: {
  game_starting_timestamp: string;
}) => void;

type IGetScoresCallback = (response: { users: IUser[] }) => void;
