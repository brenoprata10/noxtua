import type TranslationRepo from "domain/enums/TranslationRepo";

type Translation = {
  text: string;
  engine: TranslationRepo;
};

export type { Translation };
