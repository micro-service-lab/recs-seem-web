import { HOST_WS } from "@/config-global";
import { atom, selector } from "recoil";
import * as WebSocket from "websocket";

const connect = (depth: number): Promise<WebSocket.w3cwebsocket> => {
  return new Promise((resolve, reject) => {
    const url = HOST_WS + "/ws";
    const socket = new WebSocket.w3cwebsocket(url);

    socket.onopen = () => {
      console.log("ws: connected");
      resolve(socket);
    };
    socket.onclose = () => {
      if (depth > 1) {
        console.log("ws: closing...");
        return;
      }

      connect(depth + 1).then(
        (newSocket) => {
          console.log("ws: reconnected", depth);
          resolve(newSocket);
        },
        () => {
          reject();
        }
      );
    };
    socket.onerror = (err) => {
      console.log("ws: connection error:", err);
      reject(err);
    };
  });
};

const connectWebsocketSelector = selector({
  key: "connectWebsocket",
  get: async (): Promise<WebSocket.w3cwebsocket> => {
    return await connect(0);
  },
});

export const websocketAtom = atom<WebSocket.w3cwebsocket>({
  key: "websocket",
  default: connectWebsocketSelector,
});
