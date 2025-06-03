import { useEffect, useState } from "react";
import { socket } from "./sockets/socket";
import { SOCKET_EVENTS } from "./sockets/constants";
import { socket_create_room, socket_join_room } from "./sockets/events";
import { IUser } from "./types";

export default function MainBattleRoyale() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [nickname, setNickname] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [users, setUsers] = useState<IUser[]>([]);
  const [userInputRoomId, setUserInputRoomId] = useState("");
  const [roomId, setRoomId] = useState<null | string>(null);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onUserJoinedRoom(user: IUser) {
      setUsers((prev) => [...prev, user]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on(SOCKET_EVENTS.USER_JOINED_ROOM, onUserJoinedRoom);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off(SOCKET_EVENTS.USER_JOINED_ROOM, onUserJoinedRoom);
    };
  }, []);

  const handleClick = () => {
    if (isConnected) {
      socket.disconnect();
    } else {
      socket.connect();
    }
  };

  const addScore = () => {
    setScore((p) => p + 1);
  };

  const removeScore = () => {
    setScore((p) => p - 1);
  };

  const createRoom = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nickname) {
      console.error("Include a nickname");
      return;
    }

    console.log("Creating Room");
    const newRoomId = await socket_create_room(socket, nickname);
    setRoomId(newRoomId);
  };

  const joinRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nickname) {
      console.error("Include a nickname");
      return;
    }
    if (!userInputRoomId) {
      console.error("Include user room id");
      return;
    }

    try {
      const theUsers: IUser[] = await socket_join_room(
        socket,
        userInputRoomId,
        nickname
      );

      setUsers(theUsers);
      setRoomId(userInputRoomId);
    } catch (e) {
      if (e instanceof Error) {
        console.error("Join Room Error: ", e.message);
      }
    }
  };

  const btnClassName = "border-1 w-32 h-8 border-blue-800 rounded-md shadow-sm";

  return (
    <div className="flex flex-col gap-8">
      <div>
        <div>Connected: {"" + isConnected}</div>

        <button onClick={handleClick} className={btnClassName}>
          {isConnected ? "Disconnect" : "Connect"}
        </button>
      </div>
      <div>
        <form onSubmit={createRoom} className="flex gap-2">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Enter Nickname"
            className="border-1 px-2"
          />
          <button type="submit" className={btnClassName}>
            Create Room
          </button>
        </form>
        {roomId && <div>Room Id: {roomId}</div>}
      </div>
      <div>
        <form onSubmit={joinRoom} className="flex gap-2">
          <input
            type="text"
            value={userInputRoomId}
            onChange={(e) => setUserInputRoomId(e.target.value)}
            placeholder="Enter Room Number"
            className="border-1 px-2"
          />
          <button type="submit" className={btnClassName}>
            Enter Room
          </button>
        </form>
        <div>
          {users.map((user) => (
            <div>{user.nickname}</div>
          ))}
        </div>
      </div>
      <div>
        <div>Score: {score}</div>
        <div className="flex gap-1">
          <button
            onClick={removeScore}
            className="bg-blue-700 rounded-sm text-white w-16 py-2 font-bold cursor-pointer"
          >
            -
          </button>
          <button
            onClick={addScore}
            className="bg-blue-700 rounded-sm text-white w-16 py-2 font-bold cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
