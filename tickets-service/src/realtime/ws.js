import { WebSocketServer } from "ws";
import { env } from "../config/env.js";

export function createWSS() {
  const wss = new WebSocketServer({ port: env.WS_PORT });

  wss.on("connection", (ws) => {
    ws.send(JSON.stringify({ type: "hello", message: "connected to seat updates" }));
  });

  function broadcast(payload) {
    const msg = JSON.stringify(payload);
    for (const client of wss.clients) {
      try { client.send(msg); } catch {}
    }
  }

  console.log(`WebSocket listening on ${env.WS_PORT}`);
  return { wss, broadcast };
}
