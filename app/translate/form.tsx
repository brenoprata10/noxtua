import { useCallback, useState, type ChangeEvent } from "react";
import { Form } from "react-router";
import ChatInput from "view/components/ChatInput";

export function TranslateForm({
  onSubmit,
}: {
  onSubmit: (prompt: string) => void;
}) {
  const [input, setInput] = useState("");

  const onChangeInput = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setInput(event.target.value);
    },
    []
  );

  const handleSubmit = useCallback(() => {
    onSubmit(input);
    setInput("");
  }, [onSubmit, input]);

  return (
    <Form className="contents">
      <fieldset className="flex flex-col items-start gap-6 w-full">
        <ChatInput
          value={input}
          onChange={onChangeInput}
          onSubmit={handleSubmit}
        />
      </fieldset>
    </Form>
  );
}
