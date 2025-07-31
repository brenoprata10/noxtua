import type { ChatData } from "domain/types/ChatData";
import { useEffect, useRef } from "react";
import ChatMessage from "view/components/ChatMessage";

export default function Chat({ data }: { data: ChatData | null }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.scroll({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [data]);

  return (
    <div
      ref={ref}
      className="bg-chat rounded-xl border-[2px] border-[#F3F2F1] w-full h-full overflow-auto flex flex-col gap-4 p-3"
    >
      {data?.messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
}
