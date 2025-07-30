import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";

export const getChat = (state: RootState) => state.chat;

export const getSelectedChat = (state: RootState) =>
  state.chat.selectedChat ? state.chat.data[state.chat.selectedChat] : null;

export const getChatCount = createSelector(
  [getChat],
  (chat) => Object.keys(chat.data).length
);
