import { Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "./constants";
import { IUser } from "../types";

/**
 * Creates a new Room
 *
 * @param socket - The connected `Socket.IO` client instance.
 * @param nickname - The nickname of the user creating the room.
 * @returns A `Promise` that resolves to the newly created `roomId` string.
 *
 * @throws Will reject the promise if no `roomId` is returned by the server.
 *
 */
export const socket_create_room = (
  socket: Socket,
  nickname: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    socket.emit(
      SOCKET_EVENTS.CREATE_ROOM,
      nickname,
      (resp: { roomId: string }) => {
        if (resp && resp.roomId) {
          resolve(resp.roomId);
        } else {
          reject(new Error("No roomId returned"));
        }
      }
    );
  });
};

type JoinRoomResponse =
  | { success: true; users: IUser[] } // frontend-friendly version of Set<IUser>
  | { success: false; error: string };

/**
 * Join a created room
 *
 * @param socket - The connected `Socket.IO` client instance.
 * @param roomId - The ID of the room to join.
 * @param nickname - The nickname of the user joining the room.
 * @returns A `Promise` that resolves to an array of `IUser` objects currently in the room,
 *
 * @throws rejects if the join operation fails.
 *
 */
export const socket_join_room = (
  socket: Socket,
  roomId: string,
  nickname: string
): Promise<IUser[]> => {
  return new Promise((resolve, reject) => {
    socket.emit(
      SOCKET_EVENTS.JOIN_ROOM,
      roomId,
      nickname,
      (resp: JoinRoomResponse) => {
        if (resp && resp.success) {
          resolve(resp.users);
        } else {
          if (resp && resp.error) {
            reject(new Error(resp.error));
          }

          reject(new Error("Error joining room"));
        }
      }
    );
  });
};
