import axios from "axios";
import {
  SupportedLanguage,
  TranslationOptions,
  TranslationResult,
} from "../types/translate";

/**
 * Internal function to perform translation using Google Translate API.
 *
 * This helper function makes HTTP requests to the Google Translate API endpoint
 * and processes the response to extract translated text and detected language information.
 *
 * @param {string} text - The text to translate
 * @param {string} [from="auto"] - Source language code or "auto" for automatic detection
 * @param {string} to - Target language code for translation
 * @returns {Promise<{text: string, detectedLanguage: string, raw: any}>} Translation result with metadata
 *
 * @throws {Error} When the API request fails or returns invalid data
 *
 * @private
 * @async
 * @author FANNYMU
 */
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

/**
 * Translation service class providing comprehensive language translation capabilities.
 *
 * This class offers a complete translation solution using Google Translate API, including
 * text translation, language detection, batch processing, and language management utilities.
 * It supports over 100 languages and provides both simple and advanced translation methods.
 *
 * All methods are static, making the class a utility service that doesn't require instantiation.
 * The class maintains an internal list of supported languages and provides helper methods
 * for language code validation and conversion.
 *
 * @example
 * ```typescript
 * // Simple translation
 * const translated = await Translate.simpleTranslate("Hello world", "es");
 * console.log(translated); // "Hola mundo"
 *
 * // Advanced translation with options
 * const result = await Translate.translateText("Hello", { from: "en", to: "fr" });
 * console.log(result.text); // "Bonjour"
 * console.log(result.from.language.iso); // "en"
 *
 * // Language detection
 * const detection = await Translate.detectLanguage("Bonjour le monde");
 * console.log(detection.from.language.iso); // "fr"
 * ```
 *
 * @author FANNYMU
 */
export class Translate {
  /**
   * Comprehensive list of supported languages with their codes and names.
   *
   * Contains language mappings for over 100 languages supported by Google Translate,
   * including special codes like "auto" for automatic language detection.
   *
   * @private
   * @static
   * @readonly
   */
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

  /**
   * Translates text with detailed options and comprehensive result information.
   *
   * This method provides the most comprehensive translation functionality, returning
   * detailed information about the translation process including detected language,
   * original text metadata, and raw API response data.
   *
   * @param {string} text - The text to translate
   * @param {TranslationOptions} options - Translation configuration including source and target languages
   * @returns {Promise<TranslationResult>} Comprehensive translation result with metadata
   *
   * @throws {Error} When translation fails due to API errors, invalid language codes, or network issues
   *
   * @example
   * ```typescript
   * // Translate with automatic language detection
   * const result = await Translate.translateText("Hello world", {
   *   to: "es"
   * });
   * console.log(result.text); // "Hola mundo"
   * console.log(result.from.language.iso); // "en" (detected)
   *
   * // Translate with specified source language
   * const result2 = await Translate.translateText("Bonjour", {
   *   from: "fr",
   *   to: "en"
   * });
   * console.log(result2.text); // "Hello"
   * console.log(result2.from.text.value); // "Bonjour" (original)
   * ```
   *
   * @example
   * ```typescript
   * // Handle translation errors
   * try {
   *   const result = await Translate.translateText("Hello", {
   *     from: "en",
   *     to: "invalid-code"
   *   });
   * } catch (error) {
   *   console.error("Translation failed:", error.message);
   * }
   * ```
   *
   * @public
   * @static
   * @async
   * @author FANNYMU
   */
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

  /**
   * Retrieves the complete list of supported languages.
   *
   * Returns an array of all languages supported by the translation service,
   * including language codes and human-readable names.
   *
   * @returns {SupportedLanguage[]} Array of supported language objects with codes and names
   *
   * @example
   * ```typescript
   * const languages = Translate.getSupportedLanguages();
   * console.log(`Supports ${languages.length} languages`);
   *
   * languages.forEach(lang => {
   *   console.log(`${lang.code}: ${lang.name}`);
   * });
   *
   * // Filter for specific language families
   * const europeanLanguages = languages.filter(lang =>
   *   ['en', 'fr', 'de', 'es', 'it'].includes(lang.code)
   * );
   * ```
   *
   * @public
   * @static
   * @author FANNYMU
   */
  public static getSupportedLanguages(): SupportedLanguage[] {
    return this.SUPPORTED_LANGUAGES;
  }

  /**
   * Gets the human-readable name for a language code.
   *
   * Looks up the language name corresponding to the provided language code.
   * Useful for displaying user-friendly language names in interfaces.
   *
   * @param {string} code - The language code to look up
   * @returns {string | null} The language name if found, null if the code is not supported
   *
   * @example
   * ```typescript
   * const name = Translate.getLanguageName("en");
   * console.log(name); // "English"
   *
   * const name2 = Translate.getLanguageName("zh-cn");
   * console.log(name2); // "Chinese (Simplified)"
   *
   * const invalid = Translate.getLanguageName("invalid");
   * console.log(invalid); // null
   * ```
   *
   * @public
   * @static
   * @author FANNYMU
   */
  public static getLanguageName(code: string): string | null {
    const language = this.SUPPORTED_LANGUAGES.find(
      (lang) => lang.code === code
    );
    return language ? language.name : null;
  }

  /**
   * Gets the language code for a language name.
   *
   * Performs a case-insensitive lookup to find the language code corresponding
   * to the provided language name. Useful for converting user input to API codes.
   *
   * @param {string} name - The language name to look up
   * @returns {string | null} The language code if found, null if the name is not recognized
   *
   * @example
   * ```typescript
   * const code = Translate.getLanguageCode("English");
   * console.log(code); // "en"
   *
   * const code2 = Translate.getLanguageCode("spanish");
   * console.log(code2); // "es"
   *
   * const code3 = Translate.getLanguageCode("Chinese (Simplified)");
   * console.log(code3); // "zh-cn"
   *
   * const invalid = Translate.getLanguageCode("Unknown Language");
   * console.log(invalid); // null
   * ```
   *
   * @public
   * @static
   * @author FANNYMU
   */
  public static getLanguageCode(name: string): string | null {
    const language = this.SUPPORTED_LANGUAGES.find(
      (lang) => lang.name.toLowerCase() === name.toLowerCase()
    );
    return language ? language.code : null;
  }

  /**
   * Checks if a language code is supported by the translation service.
   *
   * Validates whether the provided language code exists in the supported
   * languages list. Useful for input validation before making translation requests.
   *
   * @param {string} code - The language code to validate
   * @returns {boolean} True if the language is supported, false otherwise
   *
   * @example
   * ```typescript
   * const isSupported = Translate.isLanguageSupported("en");
   * console.log(isSupported); // true
   *
   * const isSupported2 = Translate.isLanguageSupported("auto");
   * console.log(isSupported2); // true
   *
   * const isSupported3 = Translate.isLanguageSupported("xyz");
   * console.log(isSupported3); // false
   *
   * // Validate before translation
   * if (Translate.isLanguageSupported(targetLang)) {
   *   const result = await Translate.simpleTranslate(text, targetLang);
   * } else {
   *   console.error("Unsupported language code:", targetLang);
   * }
   * ```
   *
   * @public
   * @static
   * @author FANNYMU
   */
  public static isLanguageSupported(code: string): boolean {
    return this.SUPPORTED_LANGUAGES.some((lang) => lang.code === code);
  }

  /**
   * Detects the language of the provided text.
   *
   * Analyzes the input text to determine its language using automatic detection.
   * Returns the same comprehensive result format as translateText but focuses
   * on language identification rather than translation.
   *
   * @param {string} text - The text to analyze for language detection
   * @returns {Promise<TranslationResult>} Result containing detected language information
   *
   * @throws {Error} When language detection fails due to API errors or network issues
   *
   * @example
   * ```typescript
   * // Detect language of text
   * const detection = await Translate.detectLanguage("Bonjour le monde");
   * console.log(detection.from.language.iso); // "fr"
   *
   * const detection2 = await Translate.detectLanguage("こんにちは");
   * console.log(detection2.from.language.iso); // "ja"
   *
   * // Get language name from detection
   * const detectedCode = detection.from.language.iso;
   * const languageName = Translate.getLanguageName(detectedCode);
   * console.log(`Detected language: ${languageName}`); // "Detected language: French"
   * ```
   *
   * @example
   * ```typescript
   * // Batch language detection
   * const texts = ["Hello", "Hola", "Bonjour", "Guten Tag"];
   * const detections = await Promise.all(
   *   texts.map(text => Translate.detectLanguage(text))
   * );
   *
   * detections.forEach((detection, index) => {
   *   const lang = Translate.getLanguageName(detection.from.language.iso);
   *   console.log(`"${texts[index]}" is ${lang}`);
   * });
   * ```
   *
   * @public
   * @static
   * @async
   * @author FANNYMU
   */
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

  /**
   * Performs simple text translation and returns only the translated text.
   *
   * Simplified translation method that returns just the translated string
   * without additional metadata. Ideal for basic translation needs where
   * only the result text is required.
   *
   * @param {string} text - The text to translate
   * @param {string} to - Target language code
   * @param {string} [from="auto"] - Source language code or "auto" for automatic detection
   * @returns {Promise<string>} The translated text
   *
   * @throws {Error} When translation fails due to invalid parameters or API errors
   *
   * @example
   * ```typescript
   * // Simple translation with auto-detection
   * const translated = await Translate.simpleTranslate("Hello world", "es");
   * console.log(translated); // "Hola mundo"
   *
   * // Translation with specified source language
   * const translated2 = await Translate.simpleTranslate("Bonjour", "en", "fr");
   * console.log(translated2); // "Hello"
   *
   * // Chain translations
   * const step1 = await Translate.simpleTranslate("Hello", "fr");
   * const step2 = await Translate.simpleTranslate(step1, "es");
   * console.log(step2); // "Hola"
   * ```
   *
   * @example
   * ```typescript
   * // Use in a simple translation function
   * async function quickTranslate(text: string, targetLang: string): Promise<string> {
   *   try {
   *     return await Translate.simpleTranslate(text, targetLang);
   *   } catch (error) {
   *     return `Translation error: ${error.message}`;
   *   }
   * }
   *
   * const result = await quickTranslate("Good morning", "ja");
   * console.log(result); // "おはようございます"
   * ```
   *
   * @public
   * @static
   * @async
   * @author FANNYMU
   */
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

  /**
   * Translates multiple texts in parallel and returns an array of translated strings.
   *
   * Efficiently processes multiple text strings simultaneously using Promise.all,
   * making it ideal for bulk translation operations. All texts are translated
   * from the same source language to the same target language.
   *
   * @param {string[]} texts - Array of texts to translate
   * @param {string} to - Target language code for all translations
   * @param {string} [from="auto"] - Source language code or "auto" for automatic detection
   * @returns {Promise<string[]>} Array of translated texts in the same order as input
   *
   * @throws {Error} When any translation in the batch fails
   *
   * @example
   * ```typescript
   * // Translate multiple phrases
   * const phrases = ["Hello", "Good morning", "How are you?", "Thank you"];
   * const translated = await Translate.batchTranslate(phrases, "es");
   *
   * console.log(translated);
   * // ["Hola", "Buenos días", "¿Cómo estás?", "Gracias"]
   *
   * // Map results back to original
   * phrases.forEach((original, index) => {
   *   console.log(`${original} -> ${translated[index]}`);
   * });
   * ```
   *
   * @example
   * ```typescript
   * // Translate user interface strings
   * const uiStrings = [
   *   "Welcome",
   *   "Login",
   *   "Password",
   *   "Submit",
   *   "Cancel"
   * ];
   *
   * const localizedStrings = await Translate.batchTranslate(uiStrings, "fr");
   *
   * const translations = {};
   * uiStrings.forEach((key, index) => {
   *   translations[key.toLowerCase()] = localizedStrings[index];
   * });
   *
   * console.log(translations);
   * // { welcome: "Bienvenue", login: "Connexion", ... }
   * ```
   *
   * @example
   * ```typescript
   * // Handle partial failures in batch translation
   * async function safeBatchTranslate(texts: string[], to: string): Promise<(string | null)[]> {
   *   const promises = texts.map(async (text) => {
   *     try {
   *       return await Translate.simpleTranslate(text, to);
   *     } catch {
   *       return null; // Failed translation
   *     }
   *   });
   *
   *   return Promise.all(promises);
   * }
   * ```
   *
   * @public
   * @static
   * @async
   * @author FANNYMU
   */
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

  /**
   * Gets available target languages for translation from a specific source language.
   *
   * Returns an array of language codes that can be used as translation targets
   * from the specified source language. For Google Translate, most languages
   * can translate to most other languages, so this excludes only the source
   * language itself and the "auto" detection code.
   *
   * @param {string} [sourceLanguage="auto"] - The source language code
   * @returns {string[]} Array of available target language codes
   *
   * @example
   * ```typescript
   * // Get all available targets from English
   * const targets = Translate.getAvailableTargets("en");
   * console.log(`Can translate to ${targets.length} languages from English`);
   *
   * // Get language names for the targets
   * const targetNames = targets.map(code => ({
   *   code,
   *   name: Translate.getLanguageName(code)
   * }));
   *
   * console.log(targetNames.slice(0, 5));
   * // [{ code: "af", name: "Afrikaans" }, ...]
   * ```
   *
   * @example
   * ```typescript
   * // Create a language selector for UI
   * const sourceLanguage = "en";
   * const availableTargets = Translate.getAvailableTargets(sourceLanguage);
   *
   * const languageOptions = availableTargets.map(code => ({
   *   value: code,
   *   label: Translate.getLanguageName(code)
   * })).sort((a, b) => a.label.localeCompare(b.label));
   *
   * // Use in a dropdown component
   * console.log("Language options for dropdown:", languageOptions);
   * ```
   *
   * @public
   * @static
   * @author FANNYMU
   */
  public static getAvailableTargets(sourceLanguage: string = "auto"): string[] {
    // For Google Translate, most languages can translate to most other languages
    return this.SUPPORTED_LANGUAGES.filter(
      (lang) => lang.code !== sourceLanguage && lang.code !== "auto"
    ).map((lang) => lang.code);
  }
}
