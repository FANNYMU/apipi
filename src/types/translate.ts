/**
 * Configuration options for translation operations.
 *
 * This interface defines the parameters needed to configure a translation request,
 * including source and target language specifications. The source language is
 * optional and defaults to automatic detection when not specified.
 *
 * @interface TranslationOptions
 *
 * @example
 * ```typescript
 * // Translate from English to Spanish
 * const options: TranslationOptions = {
 *   from: "en",
 *   to: "es"
 * };
 *
 * // Auto-detect source language
 * const autoOptions: TranslationOptions = {
 *   to: "fr"
 * };
 * ```
 *
 * @author FANNYMU
 */
export interface TranslationOptions {
  /**
   * Source language code for the text to be translated.
   *
   * Optional ISO language code indicating the language of the input text.
   * When not specified or set to "auto", the translation service will
   * automatically detect the source language.
   *
   * @optional
   * @example "en", "es", "fr", "auto"
   */
  from?: string;

  /**
   * Target language code for the translation output.
   *
   * Required ISO language code specifying the desired language for the
   * translated text. This determines the language of the translation result.
   *
   * @example "es", "fr", "de", "ja", "zh"
   */
  to: string;
}

/**
 * Comprehensive result object from translation operations.
 *
 * This interface defines the complete response structure returned by translation
 * services, including the translated text, source language detection information,
 * text processing metadata, and raw API response data for advanced usage.
 *
 * @interface TranslationResult
 *
 * @example
 * ```typescript
 * const result: TranslationResult = {
 *   text: "Hola mundo",
 *   from: {
 *     language: {
 *       didYouMean: false,
 *       iso: "en"
 *     },
 *     text: {
 *       autoCorrected: false,
 *       value: "Hello world",
 *       didYouMean: false
 *     }
 *   },
 *   raw: '{"translated_text":"Hola mundo","detected_lang":"en"}'
 * };
 *
 * console.log(`Translated: ${result.text}`);
 * console.log(`Detected language: ${result.from.language.iso}`);
 * ```
 *
 * @author FANNYMU
 */
export interface TranslationResult {
  /**
   * The translated text in the target language.
   *
   * Contains the final translation result as processed by the translation
   * service. This is the primary output that applications will typically
   * display to users.
   *
   * @example "Hola mundo", "Bonjour le monde", "こんにちは世界"
   */
  text: string;

  /**
   * Source language and text analysis information.
   *
   * Contains detailed information about the source language detection
   * and original text processing, including any suggestions or corrections
   * that were applied during the translation process.
   */
  from: {
    /**
     * Language detection and suggestion information.
     *
     * Provides details about the detected or specified source language,
     * including whether the service suggested a different language.
     */
    language: {
      /**
       * Whether the service suggested a different source language.
       *
       * Indicates if the translation service detected that the specified
       * source language might not be correct and suggested an alternative.
       *
       * @example true, false
       */
      didYouMean: boolean;

      /**
       * ISO language code of the detected or confirmed source language.
       *
       * The language code that was actually used for translation, either
       * as specified in the request or as detected automatically by the service.
       *
       * @example "en", "es", "fr", "de", "ja"
       */
      iso: string;
    };

    /**
     * Original text processing and correction information.
     *
     * Contains details about the input text including any auto-corrections
     * or suggestions that were applied before translation.
     */
    text: {
      /**
       * Whether the original text was automatically corrected.
       *
       * Indicates if the translation service applied spelling or grammar
       * corrections to the input text before performing the translation.
       *
       * @example true, false
       */
      autoCorrected: boolean;

      /**
       * The original input text as provided.
       *
       * Preserves the exact text that was submitted for translation,
       * before any corrections or processing were applied.
       *
       * @example "Hello world", "Bonjour", "Guten Tag"
       */
      value: string;

      /**
       * Whether the service suggested a different input text.
       *
       * Indicates if the translation service detected potential issues
       * with the input text and suggested corrections or alternatives.
       *
       * @example true, false
       */
      didYouMean: boolean;
    };
  };

  /**
   * Raw response data from the translation API.
   *
   * Contains the complete, unprocessed response from the translation service
   * as a JSON string. This can be useful for debugging, logging, or accessing
   * additional metadata not exposed in the structured interface.
   *
   * @example '{"translations":[{"text":"Hola"}],"detected_language":"en"}'
   */
  raw: string;
}

/**
 * Represents a supported language with its code and display name.
 *
 * This interface defines the structure for language entries in the supported
 * languages list, providing both the ISO language code used by APIs and
 * the human-readable language name for user interfaces.
 *
 * @interface SupportedLanguage
 *
 * @example
 * ```typescript
 * const language: SupportedLanguage = {
 *   code: "en",
 *   name: "English"
 * };
 *
 * const languages: SupportedLanguage[] = [
 *   { code: "en", name: "English" },
 *   { code: "es", name: "Spanish" },
 *   { code: "fr", name: "French" }
 * ];
 *
 * // Create dropdown options
 * const options = languages.map(lang => ({
 *   value: lang.code,
 *   label: lang.name
 * }));
 * ```
 *
 * @author FANNYMU
 */
export interface SupportedLanguage {
  /**
   * ISO language code identifier.
   *
   * The standardized language code used by translation APIs and services
   * to identify languages. Typically follows ISO 639-1 format with some
   * extensions for regional variants.
   *
   * @example "en", "es", "fr", "de", "ja", "zh-cn", "zh-tw"
   */
  code: string;

  /**
   * Human-readable language name.
   *
   * The display name of the language as it should appear in user interfaces,
   * formatted for end-user consumption and localized appropriately.
   *
   * @example "English", "Spanish", "French", "German", "Japanese"
   */
  name: string;
}
