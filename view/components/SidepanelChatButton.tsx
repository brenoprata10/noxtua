import MessageType from "domain/enums/MessageType";
import type { ChatData } from "domain/types/ChatData";
import SidepanelButton from "./SidepanelButton";

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
    <SidepanelButton
      isSelected={isSelected}
      layoutId="chat-history"
      onSelect={onSelect}
    >
      {lastMessage ?? `Empty Chat`}
    </SidepanelButton>
  );
}
