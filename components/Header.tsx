import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const VilkaLogo: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="flex items-center space-x-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2V17.77" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-2xl font-bold text-white tracking-tight">Vilka</span>
        </div>
    );
}

const ConnectionStatus: React.FC = () => {
    const { t } = useLanguage();
    return (
    <div className="hidden lg:flex items-center space-x-2 border border-green-500/30 bg-green-500/10 px-3 py-1.5 rounded-full text-sm">
        <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </div>
        <span className="font-medium text-green-400">{t('header.connectionStatus')}</span>
    </div>
    );
}

const Header: React.FC = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('header.nav.features'), href: '#features' },
    { name: t('header.nav.security'), href: '#security' },
    { name: t('header.nav.testimonials'), href: '#testimonials' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <a href="#home" aria-label="Vilka Home" className="transition-opacity duration-300 hover:opacity-80 hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]">
            <VilkaLogo />
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="link-underline text-gray-300 hover:text-purple-400 transition-all duration-300 font-medium hover:drop-shadow-[0_0_5px_rgba(192,132,252,0.5)]">
                {link.name}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
             <ConnectionStatus />
             <LanguageSwitcher />
            <a href="#download" className="hidden sm:inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-lg transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/30">
              {t('header.cta')}
            </a>
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 focus:outline-none" aria-label="Toggle menu">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`transition-all duration-300 ease-in-out md:hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="bg-gray-900/90 backdrop-blur-lg px-6 pb-4 flex flex-col items-center space-y-4">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-purple-400 transition-colors duration-300 font-medium text-lg">
              {link.name}
            </a>
          ))}
          <a href="#download" onClick={() => setIsOpen(false)} className="w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-transform duration-300 hover:scale-105">
            {t('header.cta')}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;