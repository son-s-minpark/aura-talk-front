import { Client } from "@stomp/stompjs";

export const connectWebsocket = () => {
  const client = new Client({
    brokerURL: "",
    connectHeaders: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,

    onConnect: (connect) => {
      console.error("connected", connect);
    },
    onWebSocketClose: (close) => {
      console.error("socket Close", close);
    },
    onStompError: (frame) => {
      console.error(frame);
    },
  });

  client.activate();

  return client;
};
