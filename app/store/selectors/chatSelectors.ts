import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";

export const getChat = (state: RootState) => state.chat;

export const getSelectedEngine = (state: RootState) =>
  state.chat.selectedEngine;

export const getSelectedChat = createSelector([getChat], (chat) =>
  chat.selectedChat ? chat.data[chat.selectedChat] : null
);

export const getChatHistory = createSelector([getChat], (chat) =>
  Object.values(chat.data)
);

export const getChatCount = createSelector(
  [getChat],
  (chat) => Object.keys(chat.data).length
);
