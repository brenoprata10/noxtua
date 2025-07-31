import type { ChatMessage } from "./ChatMessage";

export type ChatData = {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
};
