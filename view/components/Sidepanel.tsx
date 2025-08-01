import { useAppSelector } from "~/store";
import {
  getChatHistory,
  getSelectedChat,
} from "~/store/selectors/chatSelectors";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createChat, selectChat } from "~/store/slices/chatSlice";
import SidepanelHeader from "./SidepanelHeader";
import SidepanelChatButton from "./SidepanelChatButton";

export default function Sidepanel() {
  const dispatch = useDispatch();
  const chats = useAppSelector(getChatHistory);
  const selectedChat = useAppSelector(getSelectedChat);
  const selectedChatId = selectedChat?.id;
  const isSelectedChatEmpty = selectedChat?.messages.length === 0;

  const onCreateNewChat = useCallback(() => {
    const alreadyCreatedEmptyChat = chats.find(
      (chat) => chat.messages.length === 0
    );

    if (alreadyCreatedEmptyChat) {
      dispatch(selectChat({ id: alreadyCreatedEmptyChat.id }));
      return;
    }
    dispatch(createChat());
  }, [dispatch, chats]);

  const onSelectChat = useCallback(
    (chatId: string) => {
      dispatch(selectChat({ id: chatId }));
    },
    [dispatch]
  );

  return (
    <div className="max-w-sm p-6 flex flex-col gap-4 max-h-screen max-md:hidden">
      <SidepanelHeader
        allowChatCreation={!isSelectedChatEmpty}
        onCreateNewChat={onCreateNewChat}
      />
      <div className="overflow-auto flex flex-col gap-1 h-full">
        {chats.map((chat) => (
          <SidepanelChatButton
            key={chat.id}
            chat={chat}
            isSelected={selectedChatId === chat.id}
            onSelect={() => onSelectChat(chat.id)}
          />
        ))}
      </div>
    </div>
  );
}
