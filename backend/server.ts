import express, { Request, Response } from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { randomBytes } from "node:crypto";

const PORT = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.listen(4000);

const __dirname = dirname(fileURLToPath(import.meta.url));

const rooms: Record<
  string,
  {
    users: Set<string>;
    messages: { id: string; text: string; timestamp: number }[];
  }
> = {};

app.get("/", (req: Request, res: Response) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("create-room", () => {
    const roomId = randomBytes(3).toString("hex");
    rooms[roomId] = { users: new Set(), messages: [] };
    rooms[roomId].users.add(socket.id);
    socket.join(roomId);

    socket.emit("room-created", roomId);
  });

  socket.on("join-rooms", (roomId: string) => {
    const room = rooms[roomId];
    if (!room) {
      socket.emit("error", "Room does not exist");
      return;
    }

    if (room.users.size >= 4) {
      socket.emit("error", "Room is full");
      return;
    }

    room.users.add(socket.id);
    socket.join(roomId);

    console.log("User now in room ", roomId);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
