import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en/translation.json'
import zh from './locales/zh/translation.json'
import hi from './locales/hi/translation.json'
import es from './locales/es/translation.json'
import ar from './locales/ar/translation.json'
import pt from './locales/pt/translation.json'
import fr from './locales/fr/translation.json'
import de from './locales/de/translation.json'
import ja from './locales/ja/translation.json'
import ko from './locales/ko/translation.json'
import it from './locales/it/translation.json'
import sq from './locales/sq/translation.json'
import tr from './locales/tr/translation.json'
import nl from './locales/nl/translation.json'
import pl from './locales/pl/translation.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
      hi: { translation: hi },
      es: { translation: es },
      ar: { translation: ar },
      pt: { translation: pt },
      fr: { translation: fr },
      de: { translation: de },
      ja: { translation: ja },
      ko: { translation: ko },
      it: { translation: it },
      sq: { translation: sq },
      tr: { translation: tr },
      nl: { translation: nl },
      pl: { translation: pl },
    },
    // Always default to English — region is pre-selected in dropdown only
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })

export default i18n

/** Detect the user's browser locale and return the best-matching language code */
export function detectUserLanguage(): string {
  try {
    const browserLang = navigator.language || 'en-GB'
    const code = browserLang.split('-')[0].toLowerCase()
    const supported = ['en','zh','hi','es','ar','pt','fr','de','ja','ko','it','sq','tr','nl','pl']
    return supported.includes(code) ? code : 'en'
  } catch {
    return 'en'
  }
}
