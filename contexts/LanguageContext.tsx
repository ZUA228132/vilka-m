import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

const supportedLanguages = ['ru', 'en', 'uk', 'de', 'tg'];

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string, options?: { returnObjects: boolean }) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getNestedValue = (obj: any, key: string): any => {
  if (!obj) return undefined;
  return key.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const getInitialLanguage = () => {
    const savedLang = localStorage.getItem('vilka-lang');
    if (savedLang && supportedLanguages.includes(savedLang)) {
      return savedLang;
    }
    const browserLang = navigator.language.split('-')[0];
    if (supportedLanguages.includes(browserLang)) {
      return browserLang;
    }
    return 'ru'; // Default fallback
  };

  const [language, setLanguageState] = useState<string>(getInitialLanguage);
  const [translations, setTranslations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`./locales/${language}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load locale file for: ${language}`);
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error(error);
        // If the chosen language fails, attempt to fall back to a default.
        // This prevents a total app crash if a single locale file is missing.
        if (language !== 'ru') {
            setLanguage('ru');
        } else {
            setTranslations({}); // Prevent crash if even default fails
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  const setLanguage = (lang: string) => {
    if (supportedLanguages.includes(lang) && lang !== language) {
      setLanguageState(lang);
      localStorage.setItem('vilka-lang', lang);
    }
  };

  const t = (key: string, options: { returnObjects?: boolean } = {}): any => {
    if (isLoading || !translations) {
      // During load, return an empty value to prevent crashes (e.g., from .map)
      return options.returnObjects ? [] : '';
    }
    
    const value = getNestedValue(translations, key);
    if (value === undefined) {
      console.warn(`Translation key not found: ${key} for language ${language}`);
      return options.returnObjects ? [] : key;
    }
    return value;
  };

  // Crucially, we don't render the rest of the app until the first
  // translation file has been successfully loaded.
  if (isLoading && !translations) {
    return null; // Or a loading spinner
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
