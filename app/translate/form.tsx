import ChatInput from "view/components/ChatInput";

export function TranslateForm() {
  return (
    <form className="contents" method="POST" action="/translate">
      <fieldset className="flex flex-col items-start gap-6">
        {/* implement translation engine here */}
        <ChatInput />
      </fieldset>
    </form>
  );
}
