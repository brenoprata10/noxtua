import { TranslateForm } from "../translate/form";
import Content from "view/components/Content";
import Sidepane from "view/components/Sidepane";
import { createDefaultFunTranslationService } from "io/service/FunTranslationService";
import { useFetcher } from "react-router";
import type { Translation } from "domain/types/Translation";
import type { Route } from "./+types/translate";
import Chat from "view/components/Chat";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getChatCount } from "~/store/selectors/chatSelectors";
import { createChat } from "~/store/slices/chatSlice";
import { useAppSelector } from "~/store";

type TranslationActionPayload =
  | { success: true; translation: Translation }
  | { success: false; error: string };

export const action = async ({
  request,
}: Route.ClientActionArgs): Promise<TranslationActionPayload> => {
  try {
    const data = await request.json();
    const prompt = data.prompt;
    if (!prompt) {
      throw Error("Prompt is empty. Please contact support.");
    }
    const translationService = createDefaultFunTranslationService();
    const translation = await translationService.getTranslation(
      prompt.toString()
    );

    return { success: true, translation };
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
  }

  return {
    success: false,
    error: "Translation failed. Please contact support.",
  };
};

export default function Translate() {
  const chatCount = useAppSelector(getChatCount);
  const dispatch = useDispatch();
  const fetcher = useFetcher<TranslationActionPayload>();
  const output = fetcher.data?.success ? fetcher.data?.translation.text : "";

  useEffect(() => {
    if (!chatCount) {
      dispatch(createChat("New Chat"));
    }
  }, [chatCount, dispatch]);

  const onSendMessage = useCallback(
    (prompt: string) => {
      fetcher.submit(
        { prompt },
        { action: "/translate", method: "post", encType: "application/json" }
      );
    },
    [fetcher]
  );

  return (
    <div className="flex h-full grid grid-cols-[300px_1fr]">
      <title>New React Router App</title>
      <meta name="description" content="Welcome to React Router!" />
      <Sidepane>It would be nice to see past translations here.</Sidepane>
      <Content>
        <Chat />
        {fetcher.state !== "idle" && <p>Saving...</p>}
        <TranslateForm onSubmit={onSendMessage} />
        {output}
      </Content>
    </div>
  );
}
