import { ChatBubbleIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useAppSelector } from "~/store";
import {
  getChatHistory,
  getSelectedChat,
} from "~/store/selectors/chatSelectors";
import Button from "./Button";
import clsx from "clsx";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { createChat, selectChat } from "~/store/slices/chatSlice";
import { motion } from "motion/react";
import MessageType from "domain/enums/MessageType";

export default function Sidepanel() {
  const dispatch = useDispatch();
  const chats = useAppSelector(getChatHistory);
  const selectedChat = useAppSelector(getSelectedChat);
  const selectedChatId = selectedChat?.id;

  const onCreateNewChat = useCallback(() => {
    dispatch(createChat());
  }, [dispatch]);

  const onSelectChat = useCallback(
    (chatId: string) => {
      dispatch(selectChat({ id: chatId }));
    },
    [dispatch]
  );

  return (
    <div className="max-w-sm p-6 flex flex-col gap-4">
      <div
        className="
	    flex 
	    gap-2 
	    items-center
	    text-heading 
	    justify-between 
	    w-full 
	    border-b-[0.5px]
	    border-b-gray-300
	    pb-3
	"
      >
        <ChatBubbleIcon fontWeight={5} /> <b>Chat history</b>
        <Button className="flex gap-1 items-center" onClick={onCreateNewChat}>
          <PlusCircledIcon /> <span>New Chat</span>
        </Button>
      </div>
      {chats.map((chat) => {
        const chatQuestions = chat.messages.filter(
          (message) => message.type === MessageType.QUESTION
        );
        const lastMessage = chatQuestions?.[chatQuestions.length - 1]?.content;
        const isSelected = selectedChatId === chat.id;

        return (
          <motion.div
            key={chat.id}
            className="w-full relative"
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
          >
            {isSelected && (
              <motion.div
                className={
                  "absolute h-full w-full top-0 left-0 rounded-lg bg-active-primary"
                }
                layoutId="underline"
              />
            )}
            <Button
              onClick={() => onSelectChat(chat.id)}
              className={clsx([
                "relative text-black px-3 py-1 w-full overflow-hidden text-ellipsis whitespace-nowrap bg-transparent",
              ])}
            >
              {lastMessage ?? `Empty Chat`}
            </Button>
          </motion.div>
        );
      })}
    </div>
  );
}
