import type { ChatMessage } from "./ChatMessage";

export type ChatData = Record<
  string,
  {
    title: string;
    messages: ChatMessage[];
    createdAt: string;
  }
>;
