import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { TRANSLATIONS_ADMIN_EN } from "./en/TranslationAdmin";
import { TRANSLATIONS_ADMIN_VN } from "./vn/TranslationAdmin";
import { COMMON } from "./en/TranslationCommon";
import { COMMON_VN } from "./vn/TranslationCommon";
import { TRANSLATION_USERS } from "./en/TranslationUsers";
import { TRANSLATION_USERS_VN } from "./vn/TranslationUsers";
let lng = localStorage.getItem('lng');
const resources = {
    en : {
        trans : TRANSLATIONS_ADMIN_EN,
        common : COMMON,
        users : TRANSLATION_USERS
    },
    vn : {
        trans : TRANSLATIONS_ADMIN_VN,
        common : COMMON_VN,
        users : TRANSLATION_USERS_VN
    }
};
i18n.use(LanguageDetector)
.use(initReactI18next)
.init({
    resources,
    lng : lng ?? "en",
    detection : {
        async: true,
        order: [ 'localStorage', 'navigator'],
        lookupQuerystring: 'lng',
        lookupLocalStorage: 'lng',
        caches: ['localStorage'],
    }
});

export default i18n;