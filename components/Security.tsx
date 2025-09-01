import React, { useEffect, useRef, useState } from 'react';
import { EncryptionArt } from './EncryptionArt';
import { useLanguage } from '../contexts/LanguageContext';

const Security: React.FC = () => {
  const { t } = useLanguage();
  const listRef = useRef<HTMLUListElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
      }
    );

    const currentRef = listRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);
  
  const securityPoints = t('security.points', { returnObjects: true }) as { text: string }[];

  return (
    <section id="security" className="py-20 md:py-32 bg-gray-900/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="lg:w-1/2">
            <div className="inline-block bg-indigo-500/10 text-indigo-400 text-sm font-semibold py-1 px-4 rounded-full mb-4">
              {t('security.badge')}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              {t('security.title')}
            </h2>
            <p className="text-gray-400 text-lg mb-6">
              {t('security.description')}
            </p>
            <ul ref={listRef} className={`space-y-4 text-gray-300 stagger-list ${isVisible ? 'visible' : ''}`}>
              {securityPoints.map((point, index) => (
                <li key={index} className="flex items-start group transition-all duration-300 hover:pl-2 stagger-item">
                  <svg className="w-6 h-6 text-purple-500/80 mr-3 mt-1 flex-shrink-0 transition-colors duration-300 group-hover:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span dangerouslySetInnerHTML={{ __html: point.text }} />
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:w-1/2 w-full flex items-center justify-center">
             <EncryptionArt />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;