import { HOST_WS } from "@/config-global";
import { atom, selector } from "recoil";
import * as WebSocket from "websocket";

const connect = (): Promise<WebSocket.w3cwebsocket> => {
  return new Promise((resolve, reject) => {
    const url = HOST_WS + "/ws";
    const socket = new WebSocket.w3cwebsocket(url);

    socket.onopen = () => {
      console.log("connected");
      resolve(socket);
    };
    socket.onclose = () => {
      console.log("reconnecting...");
      connect();
    };
    socket.onerror = (err) => {
      console.log("connection error:", err);
      reject(err);
    };
  });
};

const connectWebsocketSelector = selector({
  key: "connectWebsocket",
  get: async (): Promise<WebSocket.w3cwebsocket> => {
    return await connect();
  },
});

export const websocketAtom = atom<WebSocket.w3cwebsocket>({
  key: "websocket",
  default: connectWebsocketSelector,
});
