import React, { useState, useEffect } from 'react';
import { AppleIcon } from './icons/AppleIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { RuStoreIcon } from './icons/RuStoreIcon';
import { useLanguage } from '../contexts/LanguageContext';

const Download: React.FC = () => {
  const { t } = useLanguage();
  const [apkUrl, setApkUrl] = useState('#');

  useEffect(() => {
    const savedUrl = localStorage.getItem('apkDownloadLink');
    if (savedUrl) {
      setApkUrl(savedUrl);
    }
  }, []);

  return (
    <section id="download" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 sm:p-12 md:p-16 text-center overflow-hidden download-section-pulse">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-16 -right-5 w-56 h-56 bg-white/10 rounded-full"></div>
            <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
                    {t('download.title')}
                </h2>
                <p className="text-lg md:text-xl text-purple-200 max-w-3xl mx-auto mb-10">
                    {t('download.description')}
                </p>
                <div className="flex justify-center items-start gap-4 md:gap-6 flex-wrap">
                    {/* iOS */}
                    <div className="flex flex-col items-center">
                        <button
                            disabled
                            className="flex items-center justify-center gap-3 w-60 bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-colors duration-300 opacity-50 cursor-not-allowed"
                        >
                            <AppleIcon />
                            <div>
                                <span className="block text-xs text-gray-400 text-left">{t('download.ios.soon')}</span>
                                <span className="block text-xl font-bold">App Store</span>
                            </div>
                        </button>
                    </div>

                    {/* Android APK */}
                    <div className="flex flex-col items-center">
                        <a
                            href={apkUrl}
                            download
                            className={`flex items-center justify-center gap-3 w-60 bg-white text-gray-900 font-semibold py-4 px-6 rounded-lg text-lg transition-transform duration-300 transform shadow-lg ${apkUrl === '#' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:bg-gray-200 hover:shadow-white/30'}`}
                            onClick={(e) => apkUrl === '#' && e.preventDefault()}
                            aria-disabled={apkUrl === '#'}
                        >
                            <DownloadIcon />
                            <div>
                                <span className="block text-xs text-gray-600 text-left">{t('download.apk.direct')}</span>
                                <span className="block text-xl font-bold">{t('download.apk.file')}</span>
                            </div>
                        </a>
                    </div>
                    
                    {/* RuStore */}
                    <div className="flex flex-col items-center">
                        <a
                            href="#"
                            className="flex items-center justify-center gap-3 w-60 bg-gray-900 hover:bg-black text-white font-semibold py-4 px-6 rounded-lg text-lg transition-transform duration-300 transform hover:scale-105 shadow-lg hover:shadow-black/50"
                        >
                            <RuStoreIcon />
                            <div>
                                <span className="block text-xs text-gray-400 text-left">{t('download.rustore.available')}</span>
                                <span className="block text-xl font-bold">RuStore</span>
                            </div>
                        </a>
                    </div>
                </div>
                <p className="text-sm text-purple-200 mt-6 font-medium">{t('download.androidRequirement')}</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Download;