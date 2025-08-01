import { ChatBubbleIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "motion/react";
import Button from "./Button";

export default function SidepanelHeader({
  allowChatCreation,
  onCreateNewChat,
}: {
  allowChatCreation: boolean;
  onCreateNewChat: () => void;
}) {
  return (
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
        {allowChatCreation && (
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
  );
}
