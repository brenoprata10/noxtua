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
import { AnimatePresence, motion } from "motion/react";
import MessageType from "domain/enums/MessageType";

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
      <div
        className="
	    flex 
	    gap-2 
	    text-heading 
	    justify-between 
	    w-full 
	    border-b-[0.5px]
	    border-b-gray-300
	    pb-3
	    min-h-14
	"
      >
        <div className="flex gap-2 items-center">
          <ChatBubbleIcon fontWeight={5} />
          <b>Chat history</b>
        </div>
        <AnimatePresence>
          {!isSelectedChatEmpty && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Button
                className="flex gap-1 items-center"
                onClick={onCreateNewChat}
              >
                <PlusCircledIcon /> <span className="text-sm">New Chat</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="overflow-auto flex flex-col gap-1 h-full">
        {chats.map((chat) => {
          const chatQuestions = chat.messages.filter(
            (message) => message.type === MessageType.QUESTION
          );
          const lastMessage =
            chatQuestions?.[chatQuestions.length - 1]?.content;
          const isSelected = selectedChatId === chat.id;

          return (
            <motion.div
              key={chat.id}
              className="w-full relative transition-colors hover:bg-ternary rounded-lg"
              initial={{ opacity: 0, translateY: -20 }}
              animate={{ opacity: 1, translateY: 0 }}
              whileTap={{ scale: 0.9 }}
            >
              {isSelected && (
                <motion.div
                  className={
                    "absolute h-full w-full rounded-lg top-0 left-0 bg-active-primary"
                  }
                  layoutId="underline"
                />
              )}
              <Button
                onClick={() => onSelectChat(chat.id)}
                className={clsx([
                  "relative text-black px-3 py-1 w-full overflow-hidden text-ellipsis whitespace-nowrap bg-transparent z-10",
                ])}
              >
                {lastMessage ?? `Empty Chat`}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
