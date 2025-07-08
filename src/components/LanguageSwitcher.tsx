import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from './ui/Button';

import './LanguageSwitcher.css';

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="language-switcher">
      <p className="language-switcher__current">
        {t('language.current', { lng: i18n.language.toUpperCase() })}
      </p>
      <Button variant="outline" onClick={toggleLanguage}>
        {t('language.switch')} ({i18n.language === 'en' ? 'ES' : 'EN'})
      </Button>
    </div>
  );
};
