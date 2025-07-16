export interface TranslationOptions {
  from?: string;
  to: string;
}

export interface TranslationResult {
  text: string;
  from: {
    language: {
      didYouMean: boolean;
      iso: string;
    };
    text: {
      autoCorrected: boolean;
      value: string;
      didYouMean: boolean;
    };
  };
  raw: string;
}

export interface SupportedLanguage {
  code: string;
  name: string;
}
