import YodaTranslationRepo from "io/repo/YodaTranslationRepo";
import type { Translation } from "domain/types/Translation";
import type { ErrorPayload } from "domain/types/fun-translations/ErrorPayload";
import type { TranslationPayload } from "domain/types/fun-translations/TranslationPayload";
import { cached } from "../CacheService";
import type { FunTranslationService } from "./FunTranslationService";

class YodaFunTranslationService implements FunTranslationService {
  private repo: YodaTranslationRepo;

  constructor(repo: YodaTranslationRepo) {
    this.repo = repo;
  }

  async getTranslation(text: string): Promise<Translation> {
    return cached(`yoda-${text}`, async () => {
      const response = await this.repo.getTranslation(text);
      if (!response.ok) {
        const payloadError = (await response.json()) as ErrorPayload;
        throw Error(payloadError.error.message);
      }
      const payload = (await response.json()) as TranslationPayload;
      const { translated, translation } = payload.contents;
      return { text: translated, engine: translation };
    });
  }
}

export const createYodaFunTranslationService = () => {
  const yodaRepo = new YodaTranslationRepo();
  const service = new YodaFunTranslationService(yodaRepo);

  return service;
};
