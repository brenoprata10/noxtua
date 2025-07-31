import clsx from "clsx";
import MessageType from "domain/enums/MessageType";
import type { ChatMessage } from "domain/types/ChatMessage";
import { AnimatePresence, motion } from "motion/react";

const MESSAGE_STYLING: Record<MessageType, string> = {
  [MessageType.ANSWER]: "self-start bg-active-secondary",
  [MessageType.QUESTION]: "self-end bg-active-primary",
  [MessageType.ERROR]: "self-start bg-error",
};

export default function ChatMessage({ message }: { message: ChatMessage }) {
  return (
    <AnimatePresence>
      <motion.span
        key={message.id}
        animate={{ opacity: 1, translateY: 0, translateX: 0, translateZ: 0 }}
        initial={{ opacity: 0, translateY: 20, translateX: 20, translateZ: 20 }}
        exit={{ translateY: 20 }}
        className={clsx([
          "p-2 rounded-xl w-fit max-w-2xl",
          MESSAGE_STYLING[message.type],
        ])}
      >
        {message.content}
      </motion.span>
    </AnimatePresence>
  );
}
