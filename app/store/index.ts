import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlice";
import { useSelector, type TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: { chat: chatReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
