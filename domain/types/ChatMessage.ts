import type MessageType from "domain/enums/MessageType";
import type { Engine } from "./Engine";

export type ChatMessage = {
  message: string;
  type: MessageType;
  engine: Engine;
  createdAt: Date;
};
