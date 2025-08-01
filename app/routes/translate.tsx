import { TranslateForm } from "../translate/form";
import Content from "view/components/Content";
import Sidepanel from "view/components/Sidepanel";
import { useFetcher } from "react-router";
import type { Translation } from "domain/types/Translation";
import type { Route } from "./+types/translate";
import Chat from "view/components/Chat";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getChatCount,
  getSelectedChat,
  getSelectedEngine,
} from "~/store/selectors/chatSelectors";
import {
  addLoadingMessage,
  addMessage,
  createChat,
} from "~/store/slices/chatSlice";
import { useAppSelector } from "~/store";
import MessageType from "domain/enums/MessageType";
import { createYodaFunTranslationService } from "io/service/fun-translation/YodaTranslationService";
import { createPirateFunTranslationService } from "io/service/fun-translation/PirateFunTranslationService";
import TranslationRepo from "domain/enums/TranslationRepo";
import type { FunTranslationService } from "io/service/fun-translation/FunTranslationService";

const ENGINE_CONFIG: Record<TranslationRepo, () => FunTranslationService> = {
  [TranslationRepo.YODA]: createYodaFunTranslationService,
  [TranslationRepo.PIRATE]: createPirateFunTranslationService,
};

type TranslationActionPayload =
  | { success: true; translation: Translation; chatId: string }
  | { success: false; error: string };

export const action = async ({
  request,
}: Route.ClientActionArgs): Promise<TranslationActionPayload> => {
  try {
    const data = await request.json();
    const { prompt, chatId, engine } = data as {
      prompt: string;
      chatId: string;
      engine: TranslationRepo;
    };
    if (!prompt) {
      throw Error("Prompt is empty. Please contact support.");
    }
    const translationService = ENGINE_CONFIG[engine]();
    const translation = await translationService.getTranslation(
      prompt.toString()
    );

    return { success: true, translation, chatId };
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
  const chat = useAppSelector(getSelectedChat);
  const selectedEngine = useAppSelector(getSelectedEngine);
  const dispatch = useDispatch();
  const fetcher = useFetcher<TranslationActionPayload>();

  useEffect(() => {
    if (!chatCount) {
      dispatch(createChat());
    }
  }, [chatCount, dispatch]);

  // Add received response from fetcher to redux store
  useEffect(() => {
    const isSuccessPrompt = fetcher.data?.success;
    const chatId = isSuccessPrompt ? fetcher.data?.chatId : undefined;
    const output = isSuccessPrompt
      ? fetcher.data?.translation.text
      : fetcher.data?.error;

    if (output && fetcher.state === "idle") {
      dispatch(
        addMessage({
          chatId,
          content: output,
          type: isSuccessPrompt ? MessageType.ANSWER : MessageType.ERROR,
        })
      );
    }
  }, [fetcher.state, fetcher.data, dispatch]);

  const onSendMessage = useCallback(
    (prompt: string) => {
      if (!chat?.id) {
        return;
      }
      dispatch(addMessage({ content: prompt, type: MessageType.QUESTION }));
      fetcher.submit(
        { prompt, chatId: chat.id, engine: selectedEngine },
        { action: "/translate", method: "post", encType: "application/json" }
      );
      dispatch(addLoadingMessage());
    },
    [fetcher, dispatch, chat?.id, selectedEngine]
  );

  return (
    <div className="flex h-full grid grid-cols-[300px_1fr] max-md:grid-cols-1">
      <title>Chat with Noxtua</title>
      <meta name="description" content="Welcome to Noxtua chat!" />
      <Sidepanel />
      <Content>
        <Chat data={chat} />
        <TranslateForm onSubmit={onSendMessage} />
      </Content>
    </div>
  );
}
