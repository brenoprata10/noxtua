import clsx from "clsx";
import MessageType from "domain/enums/MessageType";
import type { ChatMessage } from "domain/types/ChatMessage";
import { AnimatePresence, motion } from "motion/react";
import LoadingDots from "./LoadingDots";

const MESSAGE_STYLING: Record<MessageType, string> = {
  [MessageType.ANSWER]: "self-start bg-active-secondary",
  [MessageType.QUESTION]: "self-end bg-active-primary",
  [MessageType.ERROR]: "self-start bg-error",
  [MessageType.LOADING]: "self-start bg-ternary",
};

export default function ChatMessage({ message }: { message: ChatMessage }) {
  const isLoadingMessage = message.type === MessageType.LOADING;

  return (
    <AnimatePresence>
      <motion.span
        key={message.id}
        animate={{ opacity: 1, translateY: 0, translateX: 0, translateZ: 0 }}
        initial={{ opacity: 0, translateY: 20, translateX: 20, translateZ: 20 }}
        exit={{ translateY: 20 }}
        transition={{ delay: isLoadingMessage ? 0.25 : undefined }}
        className={clsx([
          "p-2 rounded-xl w-fit max-w-2xl",
          MESSAGE_STYLING[message.type],
        ])}
      >
        {isLoadingMessage ? <LoadingDots /> : message.content}
      </motion.span>
    </AnimatePresence>
  );
}
