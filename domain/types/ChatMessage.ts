import type MessageType from "domain/enums/MessageType";
import type TranslationRepo from "domain/enums/TranslationRepo";

export type ChatMessage = {
  id: string;
  content: string;
  type: MessageType;
  engine: TranslationRepo;
  createdAt: string;
};
