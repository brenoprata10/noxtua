import MessageType from "domain/enums/MessageType";
import type { ChatData } from "domain/types/ChatData";
import { motion } from "motion/react";
import Button from "./Button";

export default function SidepanelChatButton({
  chat,
  isSelected,
  onSelect,
}: {
  chat: ChatData;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const chatQuestions = chat.messages.filter(
    (message) => message.type === MessageType.QUESTION
  );
  const lastMessage = chatQuestions?.[chatQuestions.length - 1]?.content;

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
        onClick={onSelect}
        className="relative text-black px-3 py-1 w-full overflow-hidden text-ellipsis whitespace-nowrap bg-transparent z-10"
      >
        {lastMessage ?? `Empty Chat`}
      </Button>
    </motion.div>
  );
}
