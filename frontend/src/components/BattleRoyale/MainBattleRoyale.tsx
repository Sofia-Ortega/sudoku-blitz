import { useEffect, useState } from "react";
import { socket } from "./sockets/socket";

export default function MainBattleRoyale() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState<string[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: string) {
      setFooEvents((prev) => [...prev, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  const handleClick = () => {
    if (isConnected) {
      socket.disconnect();
    } else {
      socket.connect();
    }
  };

  return (
    <div>
      <div>Connected: {"" + isConnected}</div>
      <ul>
        {fooEvents.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
      <button onClick={handleClick}>
        {isConnected ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
}
