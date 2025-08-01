class PirateTranslationRepo {
  async getTranslation(text: string) {
    const response = await fetch(
      "https://api.funtranslations.com/translate/pirate.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      }
    );

    return response;
  }
}

export default PirateTranslationRepo;
