import { Form } from "react-router";
import ChatInput from "view/components/ChatInput";

export function TranslateForm() {
  return (
    <Form className="contents" method="POST" action="/translate">
      <fieldset className="flex flex-col items-start gap-6">
        <ChatInput />
      </fieldset>
    </Form>
  );
}
