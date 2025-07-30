import { PaperPlaneIcon } from "@radix-ui/react-icons";
import Button from "./Button";
import TextArea from "./TextArea";
import { useCallback, useRef } from "react";

export default function ChatInput() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onClickChatInput = useCallback(() => {
    textAreaRef.current?.focus();
  }, []);

  const onClickSubmitButton = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
    },
    []
  );

  return (
    <div
      className="bg-chat w-full rounded-xl p-4 border-[2px] border-[#F3F2F1] flex flex-col gap-1 cursor-text"
      onClick={onClickChatInput}
    >
      <TextArea
        ref={textAreaRef}
        placeholder="Chat with Noxtua"
        name="prompt"
      />
      <Button
        type="submit"
        className="w-fit self-end"
        onClick={onClickSubmitButton}
      >
        <PaperPlaneIcon />
      </Button>
    </div>
  );
}
