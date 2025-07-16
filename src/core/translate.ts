import axios from "axios";
import {
  SupportedLanguage,
  TranslationOptions,
  TranslationResult,
} from "../types/translate";

async function translate(text: string, from: string = "auto", to: string) {
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.append("client", "gtx");
  url.searchParams.append("sl", from);
  url.searchParams.append("dt", "t");
  url.searchParams.append("tl", to);
  url.searchParams.append("q", text);

  const response = await axios.get(url.toString());

  const translatedText =
    response.data[0]?.map(([translation]: [string]) => translation).join(" ") ||
    "";

  const detectedLanguage = response.data[2] || from;

  return {
    text: translatedText,
    detectedLanguage: detectedLanguage,
    raw: response.data,
  };
}

export class Translate {
  // Supported languages list
  private static readonly SUPPORTED_LANGUAGES: SupportedLanguage[] = [
    { code: "auto", name: "Auto Detect" },
    { code: "af", name: "Afrikaans" },
    { code: "sq", name: "Albanian" },
    { code: "am", name: "Amharic" },
    { code: "ar", name: "Arabic" },
    { code: "hy", name: "Armenian" },
    { code: "az", name: "Azerbaijani" },
    { code: "eu", name: "Basque" },
    { code: "be", name: "Belarusian" },
    { code: "bn", name: "Bengali" },
    { code: "bs", name: "Bosnian" },
    { code: "bg", name: "Bulgarian" },
    { code: "ca", name: "Catalan" },
    { code: "ceb", name: "Cebuano" },
    { code: "ny", name: "Chichewa" },
    { code: "zh", name: "Chinese (Simplified)" },
    { code: "zh-cn", name: "Chinese (Simplified)" },
    { code: "zh-tw", name: "Chinese (Traditional)" },
    { code: "co", name: "Corsican" },
    { code: "hr", name: "Croatian" },
    { code: "cs", name: "Czech" },
    { code: "da", name: "Danish" },
    { code: "nl", name: "Dutch" },
    { code: "en", name: "English" },
    { code: "eo", name: "Esperanto" },
    { code: "et", name: "Estonian" },
    { code: "tl", name: "Filipino" },
    { code: "fi", name: "Finnish" },
    { code: "fr", name: "French" },
    { code: "fy", name: "Frisian" },
    { code: "gl", name: "Galician" },
    { code: "ka", name: "Georgian" },
    { code: "de", name: "German" },
    { code: "el", name: "Greek" },
    { code: "gu", name: "Gujarati" },
    { code: "ht", name: "Haitian Creole" },
    { code: "ha", name: "Hausa" },
    { code: "haw", name: "Hawaiian" },
    { code: "iw", name: "Hebrew" },
    { code: "he", name: "Hebrew" },
    { code: "hi", name: "Hindi" },
    { code: "hmn", name: "Hmong" },
    { code: "hu", name: "Hungarian" },
    { code: "is", name: "Icelandic" },
    { code: "ig", name: "Igbo" },
    { code: "id", name: "Indonesian" },
    { code: "ga", name: "Irish" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
    { code: "jw", name: "Javanese" },
    { code: "kn", name: "Kannada" },
    { code: "kk", name: "Kazakh" },
    { code: "km", name: "Khmer" },
    { code: "ko", name: "Korean" },
    { code: "ku", name: "Kurdish (Kurmanji)" },
    { code: "ky", name: "Kyrgyz" },
    { code: "lo", name: "Lao" },
    { code: "la", name: "Latin" },
    { code: "lv", name: "Latvian" },
    { code: "lt", name: "Lithuanian" },
    { code: "lb", name: "Luxembourgish" },
    { code: "mk", name: "Macedonian" },
    { code: "mg", name: "Malagasy" },
    { code: "ms", name: "Malay" },
    { code: "ml", name: "Malayalam" },
    { code: "mt", name: "Maltese" },
    { code: "mi", name: "Maori" },
    { code: "mr", name: "Marathi" },
    { code: "mn", name: "Mongolian" },
    { code: "my", name: "Myanmar (Burmese)" },
    { code: "ne", name: "Nepali" },
    { code: "no", name: "Norwegian" },
    { code: "or", name: "Odia" },
    { code: "ps", name: "Pashto" },
    { code: "fa", name: "Persian" },
    { code: "pl", name: "Polish" },
    { code: "pt", name: "Portuguese" },
    { code: "pa", name: "Punjabi" },
    { code: "ro", name: "Romanian" },
    { code: "ru", name: "Russian" },
    { code: "sm", name: "Samoan" },
    { code: "gd", name: "Scots Gaelic" },
    { code: "sr", name: "Serbian" },
    { code: "st", name: "Sesotho" },
    { code: "sn", name: "Shona" },
    { code: "sd", name: "Sindhi" },
    { code: "si", name: "Sinhala" },
    { code: "sk", name: "Slovak" },
    { code: "sl", name: "Slovenian" },
    { code: "so", name: "Somali" },
    { code: "es", name: "Spanish" },
    { code: "su", name: "Sundanese" },
    { code: "sw", name: "Swahili" },
    { code: "sv", name: "Swedish" },
    { code: "tg", name: "Tajik" },
    { code: "ta", name: "Tamil" },
    { code: "te", name: "Telugu" },
    { code: "th", name: "Thai" },
    { code: "tr", name: "Turkish" },
    { code: "uk", name: "Ukrainian" },
    { code: "ur", name: "Urdu" },
    { code: "ug", name: "Uyghur" },
    { code: "uz", name: "Uzbek" },
    { code: "vi", name: "Vietnamese" },
    { code: "cy", name: "Welsh" },
    { code: "xh", name: "Xhosa" },
    { code: "yi", name: "Yiddish" },
    { code: "yo", name: "Yoruba" },
    { code: "zu", name: "Zulu" },
  ];

  public static async translateText(
    text: string,
    options: TranslationOptions
  ): Promise<TranslationResult> {
    try {
      const result = await translate(text, options.from || "auto", options.to);

      return {
        text: result.text,
        from: {
          language: {
            didYouMean: false,
            iso: result.detectedLanguage,
          },
          text: {
            autoCorrected: false,
            value: text,
            didYouMean: false,
          },
        },
        raw: JSON.stringify(result.raw),
      };
    } catch (error) {
      throw new Error(`Translation failed: ${error}`);
    }
  }

  public static getSupportedLanguages(): SupportedLanguage[] {
    return this.SUPPORTED_LANGUAGES;
  }

  public static getLanguageName(code: string): string | null {
    const language = this.SUPPORTED_LANGUAGES.find(
      (lang) => lang.code === code
    );
    return language ? language.name : null;
  }

  public static getLanguageCode(name: string): string | null {
    const language = this.SUPPORTED_LANGUAGES.find(
      (lang) => lang.name.toLowerCase() === name.toLowerCase()
    );
    return language ? language.code : null;
  }

  public static isLanguageSupported(code: string): boolean {
    return this.SUPPORTED_LANGUAGES.some((lang) => lang.code === code);
  }

  public static async detectLanguage(text: string): Promise<TranslationResult> {
    try {
      const result = await translate(text, "auto", "en");

      return {
        text: result.text,
        from: {
          language: {
            didYouMean: false,
            iso: result.detectedLanguage,
          },
          text: {
            autoCorrected: false,
            value: text,
            didYouMean: false,
          },
        },
        raw: JSON.stringify(result.raw),
      };
    } catch (error) {
      throw new Error(`Language detection failed: ${error}`);
    }
  }

  public static async simpleTranslate(
    text: string,
    to: string,
    from: string = "auto"
  ): Promise<string> {
    try {
      const result = await translate(text, from, to);
      return result.text;
    } catch (error) {
      throw new Error(`Translation failed: ${error}`);
    }
  }

  public static async batchTranslate(
    texts: string[],
    to: string,
    from: string = "auto"
  ): Promise<string[]> {
    try {
      const promises = texts.map((text) => translate(text, from, to));
      const results = await Promise.all(promises);
      return results.map((result) => result.text);
    } catch (error) {
      throw new Error(`Batch translation failed: ${error}`);
    }
  }

  public static getAvailableTargets(sourceLanguage: string = "auto"): string[] {
    // For Google Translate, most languages can translate to most other languages
    return this.SUPPORTED_LANGUAGES.filter(
      (lang) => lang.code !== sourceLanguage && lang.code !== "auto"
    ).map((lang) => lang.code);
  }
}
