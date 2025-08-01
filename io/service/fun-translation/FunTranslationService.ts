import type { Translation } from "domain/types/Translation";

export interface FunTranslationService {
  getTranslation(text: string): Promise<Translation>;
}
