import { Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "./constants";

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

export const socket_join_room = (socket: Socket) => {};
