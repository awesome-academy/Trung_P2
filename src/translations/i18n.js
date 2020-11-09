import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { TRANSLATIONS_ADMIN_EN } from "./en/TranslationAdmin";
import { TRANSLATIONS_ADMIN_VN } from "./vn/TranslationAdmin";
import { COMMON } from "./en/TranslationCommon";
import { COMMON_VN } from "./vn/TranslationCommon";
let lng = localStorage.getItem('lng');
const resources = {
    en : {
        trans : TRANSLATIONS_ADMIN_EN,
        common : COMMON
    },
    vn : {
        trans : TRANSLATIONS_ADMIN_VN,
        common : COMMON_VN
    }
};
i18n.use(LanguageDetector)
.use(initReactI18next)
.init({
    resources,
    lng : lng ? lng : "en",
    detection : {
        async: true,
        order: [ 'localStorage', 'navigator'],
        lookupQuerystring: 'lng',
        lookupLocalStorage: 'lng',
        caches: ['localStorage'],
    }
});

export default i18n;