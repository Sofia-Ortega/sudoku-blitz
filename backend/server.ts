import express, { Request, Response } from "express";
import { createServer } from "node:http";
// import { Server } from "socket.io";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const PORT = 3000;

const app = express();
const server = createServer(app);
// const io = new Server(server);

// const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req: Request, res: Response) => {
  // res.send("hello world!!! ");
  res.sendFile(join(__dirname, "index.html"));
});

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// io.on("connection", (socket) => {
//   console.log("a user connected");
// });
