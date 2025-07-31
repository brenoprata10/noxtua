import type { ChatMessage } from "./ChatMessage";

export type ChatData = {
  id: string;
  messages: ChatMessage[];
  createdAt: string;
};
