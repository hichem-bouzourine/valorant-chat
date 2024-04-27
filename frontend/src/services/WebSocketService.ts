import { useEffect, useState } from "react";

const useWebSocket = (url:string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [socketIsOpen, setSocketIsOpen] = useState<boolean>(false);
  const [error, setError] = useState<Event | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket(url);
    setSocket(newSocket);
  } , []);


  useEffect(() => {
    if (!socket) return;

    socket.onopen = () => {
      console.log("WebSocket connected");
      setSocketIsOpen(true);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError(error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setSocketIsOpen(false);
    };

  }, [socket]);

  const sendEvent = (event : string, data : any) => {
    if (socket && socketIsOpen) {
      socket.send(JSON.stringify({ event, data}));
    } else {
      console.error(`${event} not send, socket not connected.`);
    }
  };

  return { socket, socketIsOpen, error, sendEvent };
};

export default useWebSocket;