import { GoogleTranslator } from "anylang/translators";
import { Scheduler } from "anylang/scheduling/Scheduler";
import { DEFAULT_SETTINGS, LANGUAGE_CODES } from "../const";

export class GoogleTranslatorModel {
    private translator = new GoogleTranslator();
    private scheduler = new Scheduler(this.translator, { translatePoolDelay: 100 });

    /**
     * Translates input text using GoogleTranslator via anylang scheduler.
     *
     * @param textToTranslate - The text/phrase to translate.
     * @param fromLang - ISO language code or category name (e.g. 'ru', 'sv', 'en', 'russian', 'auto').
     * @param targetLang - Two-letter target language code (e.g. 'en', 'sv', 'ru').
     * @returns Translated string.
     */
    async Translate(textToTranslate: string, fromLang?: string | null, targetLang?: string,): Promise<string> {
        //check settings, fallback to google auto. Google has automatic language detection and therefore we use it instead of our own local
        const sourceLang = fromLang && LANGUAGE_CODES[fromLang] ? LANGUAGE_CODES[fromLang] : fromLang || "auto";
        const toLang = targetLang || DEFAULT_SETTINGS.googleTranslateTargetLanguage;

        return await this.scheduler.translate(
            textToTranslate,
            sourceLang,
            toLang,
        );
    }
}

