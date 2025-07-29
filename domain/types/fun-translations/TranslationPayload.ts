import type TranslationRepo from "domain/enums/TranslationRepo";

export type TranslationPayload = {
  success: {
    total: number;
  };
  contents: {
    translated: string;
    text: string;
    translation: TranslationRepo;
  };
};
