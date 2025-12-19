import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ptBR from "./locales/ptBR/translation.json";
import en from "./locales/en/translation.json";

function detectLanguage() {
  const saved = localStorage.getItem("lang");
  if (saved === "ptBR" || saved === "en") return saved;

  const nav = navigator.language.toLowerCase();
  return nav.startsWith("pt") ? "ptBR" : "en";
}

i18n.use(initReactI18next).init({
  resources: {
    ptBR: { translation: ptBR },
    en: { translation: en },
  },
  lng: detectLanguage(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
