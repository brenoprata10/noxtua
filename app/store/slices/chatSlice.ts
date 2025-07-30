import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ChatData } from "domain/types/ChatData";
import type { ChatMessage } from "domain/types/ChatMessage";
import { v4 as uuid } from "uuid";

export interface ChatSlice {
  data: ChatData;
  selectedChat?: string;
}

const initialState: ChatSlice = {
  data: {},
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    createChat: (state, action: PayloadAction<string>) => {
      const title = action.payload;
      const id = uuid();
      state.data[id] = {
        title,
        messages: [],
        createdAt: new Date().toISOString(),
      };
      state.selectedChat = id;
    },
    addMessage: (
      state,
      action: PayloadAction<{ id: string; message: ChatMessage }>
    ) => {
      const { id, message } = action.payload;
      state.data[id].messages.push(message);
    },
  },
});

export const { createChat, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
