import type { Translation } from "domain/types/Translation";
import YodaTranslationRepo from "../repo/YodaTranslationRepo";
import type { TranslationPayload } from "domain/types/fun-translations/TranslationPayload";
import type { ErrorPayload } from "domain/types/fun-translations/ErrorPayload";
import { cached } from "./CacheService";

interface FunTranslationService {
  getTranslation(text: string): Promise<Translation>;
}

class DefaultFunTranslationService implements FunTranslationService {
  private repo: YodaTranslationRepo;

  constructor(repo: YodaTranslationRepo) {
    this.repo = repo;
  }

  getTranslation(text: string): Promise<Translation> {
    return cached(text, async () => {
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

const createDefaultFunTranslationService = () => {
  const yodaRepo = new YodaTranslationRepo();
  const service = new DefaultFunTranslationService(yodaRepo);

  return service;
};

export { DefaultFunTranslationService, createDefaultFunTranslationService };
