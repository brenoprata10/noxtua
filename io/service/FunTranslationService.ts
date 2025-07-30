import type { Translation } from "domain/types/Translation";
import YodaTranslationRepo from "../repo/YodaTranslationRepo";
import type { TranslationPayload } from "domain/types/fun-translations/TranslationPayload";
import type { ErrorPayload } from "domain/types/fun-translations/ErrorPayload";
import cacheService from "./CacheService";

interface FunTranslationService {
  getTranslation(text: string): Promise<Translation>;
}

class DefaultFunTranslationService implements FunTranslationService {
  private repo: YodaTranslationRepo;

  constructor(repo: YodaTranslationRepo) {
    this.repo = repo;
  }

  async getTranslation(text: string): Promise<Translation> {
    const cachedValue = cacheService.getValue<Translation>(text);
    if (cachedValue) {
      return cachedValue;
    }

    const response = await this.repo.getTranslation(text);
    if (!response.ok) {
      const payloadError = (await response.json()) as ErrorPayload;
      throw Error(payloadError.error.message);
    }
    const payload = (await response.json()) as TranslationPayload;
    const { translated, translation } = payload.contents;
    const data = { text: translated, engine: translation };

    cacheService.setValue(text, data);
    return data;
  }
}

const createDefaultFunTranslationService = () => {
  const yodaRepo = new YodaTranslationRepo();
  const service = new DefaultFunTranslationService(yodaRepo);

  return service;
};

export { DefaultFunTranslationService, createDefaultFunTranslationService };
