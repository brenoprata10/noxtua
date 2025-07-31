import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import TranslationRepo from "domain/enums/TranslationRepo";
import type { ChatsObject } from "domain/types/ChatsObject";
import type { ChatMessage } from "domain/types/ChatMessage";
import { v4 as uuid } from "uuid";

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
    createChat: (state, action: PayloadAction<string>) => {
      const title = action.payload;
      const id = uuid();
      state.data[id] = {
        id,
        title,
        messages: [],
        createdAt: new Date().toISOString(),
      };
      state.selectedChat = id;
    },
    addMessage: (
      state,
      action: PayloadAction<Pick<ChatMessage, "content" | "type">>
    ) => {
      const selectedChatId = state.selectedChat;
      if (!selectedChatId) {
        throw Error("Cannot add message to unknown chat.");
      }
      state.data[selectedChatId].messages.push({
        id: uuid(),
        createdAt: new Date().toISOString(),
        engine: state.selectedEngine,
        ...action.payload,
      });
    },
  },
});

export const { createChat, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
