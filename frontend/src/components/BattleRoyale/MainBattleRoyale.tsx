import { useEffect, useState } from "react";
import { socket } from "./sockets/socket";
import { SOCKET_EVENTS } from "./sockets/constants";
import { socket_create_room, join_room } from "./sockets/events";

export default function MainBattleRoyale() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [nickname, setNickname] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [userInputRoomId, setUserInputRoomId] = useState("");
  const [roomId, setRoomId] = useState<null | string>(null);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const handleClick = () => {
    if (isConnected) {
      socket.disconnect();
    } else {
      socket.connect();
    }
  };

  const joinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit(SOCKET_EVENTS.JOIN_ROOM, userInputRoomId);
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

    console.log("new room id:", newRoomId);
    setRoomId(newRoomId);
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
