import { useSettingsStore } from '../stores/settingsStore';
import { translations, type Language } from '../translations';

export const useTranslation = () => {
  const { language } = useSettingsStore();
  
  const t = (key: string) => {
    const langTranslations = translations[language as Language] || translations.English;
    return langTranslations[key] || key;
  };

  return { t, language };
};
