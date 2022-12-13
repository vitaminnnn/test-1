import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { TRANSLATIONS_EN } from '@/public/translations/en/translations'
import { TRANSLATIONS_RU } from '@/public/translations/ru/translations'
import { TRANSLATIONS_UA } from '@/public/translations/ua/translations'
import { TRANSLATIONS_ES } from '@/public/translations/es/translations'
import { TRANSLATIONS_PT } from '@/public/translations/pt/translations'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    lng: 'en',
    fallbackLng: 'en, uk, pt, es',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: TRANSLATIONS_EN,
      },
      ru: {
        translation: TRANSLATIONS_RU,
      },
      uk: {
        translation: TRANSLATIONS_UA,
      },
      pt: {
        translation: TRANSLATIONS_PT,
      },
      es: {
        translation: TRANSLATIONS_ES,
      },
    },
  })

export default i18n
