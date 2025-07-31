import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import TranslationRepo from "domain/enums/TranslationRepo";
import type { ChatsObject } from "domain/types/ChatsObject";
import type { ChatMessage } from "domain/types/ChatMessage";
import { v4 as uuid } from "uuid";
import type { ChatData } from "domain/types/ChatData";

export interface ChatSlice {
  data: ChatsObject;
  selectedEngine: TranslationRepo;
  selectedChat?: string;
}

const initialState: ChatSlice = {
  data: {},
  selectedEngine: TranslationRepo.YODA,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    createChat: (state) => {
      const id = uuid();
      state.data[id] = {
        id,
        messages: [],
        createdAt: new Date().toISOString(),
      };
      state.selectedChat = id;
    },
    selectChat: (state, action: PayloadAction<Pick<ChatData, "id">>) => {
      state.selectedChat = action.payload.id;
    },
    addMessage: (
      state,
      action: PayloadAction<
        Pick<ChatMessage, "content" | "type"> & { chatId?: string }
      >
    ) => {
      const { content, chatId: chatIdPayload, type } = action.payload;
      const selectedChatId = state.selectedChat;
      const chatId = chatIdPayload ?? selectedChatId;

      if (!chatId) {
        throw Error("Cannot add message to unknown chat.");
      }
      state.data[chatId].messages.push({
        id: uuid(),
        createdAt: new Date().toISOString(),
        engine: state.selectedEngine,
        content,
        type,
      });
    },
  },
});

export const { createChat, addMessage, selectChat } = chatSlice.actions;
export default chatSlice.reducer;
