import PirateTranslationRepo from "io/repo/PirateTranslationRepo";
import type { FunTranslationService } from "./FunTranslationService";
import type { Translation } from "domain/types/Translation";
import type { ErrorPayload } from "domain/types/fun-translations/ErrorPayload";
import type { TranslationPayload } from "domain/types/fun-translations/TranslationPayload";
import { cached } from "../CacheService";

class PirateFunTranslationService implements FunTranslationService {
  private repo: PirateTranslationRepo;

  constructor(repo: PirateTranslationRepo) {
    this.repo = repo;
  }

  getTranslation(text: string): Promise<Translation> {
    return cached(`pirate-${text}`, async () => {
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

export const createPirateFunTranslationService = () => {
  const pirateRepo = new PirateTranslationRepo();
  const service = new PirateFunTranslationService(pirateRepo);

  return service;
};
