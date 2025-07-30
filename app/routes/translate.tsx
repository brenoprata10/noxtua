import { TranslateForm } from "../translate/form";
import Content from "view/components/Content";
import Sidepane from "view/components/Sidepane";
import { createDefaultFunTranslationService } from "io/service/FunTranslationService";
import { useActionData } from "react-router";
import type { Translation } from "domain/types/Translation";
import type { Route } from "./+types/translate";

type TranslationActionPayload =
  | { success: true; data: Translation }
  | { success: false; error: string };

export const action = async ({
  request,
}: Route.ClientActionArgs): Promise<TranslationActionPayload> => {
  try {
    const formData = await request.formData();
    const prompt = formData.get("prompt");
    if (!prompt) {
      throw Error("Prompt is empty. Please contact support.");
    }
    const translationService = createDefaultFunTranslationService();
    const translation = await translationService.getTranslation(
      prompt.toString()
    );

    return { success: true, data: translation };
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
  const translation = useActionData<typeof action>();
  const output = translation?.success ? translation.data.text : "";
  const errorMessage = !translation?.success ? translation?.error : "";

  return (
    <div className="flex h-full">
      <title>New React Router App</title>
      <meta name="description" content="Welcome to React Router!" />
      <Sidepane>It would be nice to see past translations here.</Sidepane>
      <Content>
        <TranslateForm />
        {output}
        {errorMessage}
      </Content>
    </div>
  );
}
