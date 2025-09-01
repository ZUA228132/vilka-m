import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const footerLinks = t('footer.links', { returnObjects: true }) as string[];
  const legalLinks = t('footer.legal', { returnObjects: true }) as string[];

  const socialIcons = [
    { name: 'Twitter', path: 'M22 4s-.7 2.1-2.4 3.1c.8-.5 1.4-1.2 1.7-2.1 0 0-1.4.8-2.8 1.1C17.4 5 16 4 14.5 4c-2.9 0-5.2 2.3-5.2 5.2 0 .4 0 .8.1 1.2-4.3-.2-8.1-2.3-10.7-5.4C.1 6.3 0 7.5 0 8.7c0 1.8 1 3.4 2.4 4.3-.9 0-1.7-.3-2.4-.7v.1c0 2.5 1.8 4.6 4.1 5.1-.4.1-.8.2-1.3.2-.3 0-.6 0-.9-.1.7 2.1 2.6 3.6 4.9 3.6-1.8 1.4-4 2.2-6.4 2.2-.4 0-.8 0-1.2-.1 2.3 1.5 5 2.3 7.9 2.3 9.5 0 14.7-7.8 14.7-14.7v-.7c1-.7 1.8-1.6 2.5-2.6z' },
    { name: 'GitHub', path: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' },
    { name: 'LinkedIn', path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z' },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-12">
        <div className="md:flex md:justify-between">
          <div className="mb-8 md:mb-0">
            <a href="#home" className="flex items-center space-x-2">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 2V17.77" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-2xl font-bold text-white tracking-tight">Vilka</span>
            </a>
            <p className="mt-4 text-gray-400 max-w-xs">{t('footer.tagline')}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.navigation')}</h3>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link}><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.legalTitle')}</h3>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link}><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">{t('footer.social')}</h3>
              <div className="flex space-x-4">
                {socialIcons.map((icon) => (
                   <a key={icon.name} href="#" aria-label={icon.name} className="text-gray-400 hover:text-purple-400 transition-all duration-300 social-icon">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon.path}></path></svg>
                   </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Vilka Messenger. {t('footer.copyright')} <a href="#admin" className="text-gray-700 hover:text-gray-500 transition-colors">.</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;