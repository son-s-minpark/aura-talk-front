import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

export const connectWebsocket = () => {
  // const socket = new SockJS("https://demo.rabbitmq.com/ws");
  const client = new Client({
    brokerURL: "https://demo.rabbitmq.com/ws",
    connectHeaders: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,

    onConnect: (frame) => {
      console.error("connected", frame);
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
