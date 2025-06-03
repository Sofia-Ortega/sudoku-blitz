import express, { Request, Response } from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { randomBytes } from "node:crypto";
import { EVENTS } from "./constants";

const PORT = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.listen(4000);

const rooms: IRooms = {};

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on(
    EVENTS.CREATE_ROOM,
    (nickname: string, callback: ICreateRoomCallback) => {
      console.log("Creating room");

      const hostUser: IUser = {
        socketId: socket.id,
        nickname: nickname,
        score: 0,
      };

      const newRoomMetadata: IRoomMetadata = {
        hostSocketId: socket.id,
        users: new Set([hostUser]),
      };

      const roomId = randomBytes(3).toString("hex");
      rooms[roomId] = newRoomMetadata;

      socket.join(roomId);

      callback({
        roomId: roomId,
      });
    }
  );

  socket.on(
    EVENTS.JOIN_ROOM,
    (roomId: string, nickname: string, callback: IJoinRoomCallback) => {
      console.log("Processing request to join room: ", roomId);
      const room: IRoomMetadata | undefined = rooms[roomId];
      if (!room) {
        callback({
          success: false,
          error: "Room does not exist",
        });
        return;
      }

      if (room.users.size >= 4) {
        callback({
          success: false,
          error: "Room is full",
        });
        return;
      }

      const myUser: IUser = {
        socketId: socket.id,
        nickname: nickname,
        score: 0,
      };

      socket.join(roomId);

      console.log("User now in room ", roomId);

      callback({
        success: true,
        users: room.users,
      });

      room.users.add(myUser);
    }
  );
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
