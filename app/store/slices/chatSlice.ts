import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import TranslationRepo from "domain/enums/TranslationRepo";
import type { ChatsObject } from "domain/types/ChatsObject";
import type { ChatMessage } from "domain/types/ChatMessage";
import { v4 as uuid } from "uuid";
import type { ChatData } from "domain/types/ChatData";
import MessageType from "domain/enums/MessageType";

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
      // Remove loading message if there is any
      const loadingMessageIndex = state.data[chatId].messages.findIndex(
        (message) => message.type === MessageType.LOADING
      );
      if (loadingMessageIndex !== -1) {
        state.data[chatId].messages.splice(loadingMessageIndex, 1);
      }

      state.data[chatId].messages.push({
        id: uuid(),
        createdAt: new Date().toISOString(),
        engine: state.selectedEngine,
        content,
        type,
      });
    },
    addLoadingMessage: (state) => {
      const selectedChatId = state.selectedChat;
      if (!selectedChatId) {
        throw Error("Cannot add message to unknown chat.");
      }
      console.log("add loading message");
      state.data[selectedChatId].messages.push({
        id: uuid(),
        createdAt: new Date().toISOString(),
        engine: state.selectedEngine,
        content: "",
        type: MessageType.LOADING,
      });
    },
    updateSelectedEngine: (state, action: PayloadAction<TranslationRepo>) => {
      state.selectedEngine = action.payload;
    },
  },
});

export const {
  createChat,
  addMessage,
  selectChat,
  addLoadingMessage,
  updateSelectedEngine,
} = chatSlice.actions;
export default chatSlice.reducer;
