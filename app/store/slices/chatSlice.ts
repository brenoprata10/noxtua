import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type MessageType from "domain/enums/MessageType";
import type { Engine } from "domain/types/Engine";
import { v4 as uuid } from "uuid";

type ChatMessage = {
  message: string;
  type: MessageType;
  engine: Engine;
  createdAt: Date;
};

export interface ChatSlice {
  chats: Record<
    string,
    {
      title: string;
      messages: ChatMessage[];
      createdAt: Date;
    }
  >;
}

const initialState: ChatSlice = {
  chats: {},
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    createChat: (state, action: PayloadAction<string>) => {
      const title = action.payload;
      const id = uuid();
      state.chats[id] = {
        title,
        messages: [],
        createdAt: new Date(),
      };
    },
    addMessage: (
      state,
      action: PayloadAction<{ id: string; message: ChatMessage }>
    ) => {
      const { id, message } = action.payload;
      state.chats[id].messages.push(message);
    },
  },
});

export const { createChat, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
