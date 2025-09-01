import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AdminPanel: React.FC = () => {
    const { t } = useLanguage();
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [apkLink, setApkLink] = useState('');
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const ADMIN_PASSWORD = "vilka_admin_2024";

    useEffect(() => {
        const savedLink = localStorage.getItem('apkDownloadLink');
        if (savedLink) {
            setApkLink(savedLink);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setMessage(null);
        } else {
            setMessage({ text: t('admin.error.wrongPassword'), type: 'error' });
        }
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            localStorage.setItem('apkDownloadLink', apkLink);
            setMessage({ text: t('admin.success.linkSaved'), type: 'success' });
        } catch (error) {
            setMessage({ text: t('admin.error.saveFailed'), type: 'error' });
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword('');
        setMessage(null);
    }
    
    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4 font-sans"
             style={{
                background: `linear-gradient(-45deg, #0a0a1a, #0d0124, #1a1c3a, #0a0a1a)`,
                backgroundSize: '400% 400%',
                animation: 'animated-gradient 25s ease infinite'
             }}
        >
             <div 
                className="fixed inset-0 z-0" 
                style={{
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                }}
            ></div>
            <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl shadow-purple-900/30 p-8 z-10">
                <div className="text-center mb-8">
                     <h1 className="text-3xl font-bold text-white tracking-tight">{t('admin.title')}</h1>
                     <p className="text-gray-400 mt-2">{t('admin.subtitle')}</p>
                </div>
                
                {!isAuthenticated ? (
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">{t('admin.passwordLabel')}</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="admin-input w-full px-4 py-2 rounded-lg"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-5 rounded-lg transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/30">
                            {t('admin.loginButton')}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSave} className="space-y-6">
                         <div>
                            <label htmlFor="apkLink" className="block text-sm font-medium text-gray-300 mb-2">{t('admin.apkLinkLabel')}</label>
                            <input
                                id="apkLink"
                                type="url"
                                value={apkLink}
                                onChange={(e) => setApkLink(e.target.value)}
                                placeholder="https://example.com/vilka.apk"
                                className="admin-input w-full px-4 py-2 rounded-lg"
                                required
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-5 rounded-lg transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/30">
                                {t('admin.saveButton')}
                            </button>
                             <button type="button" onClick={handleLogout} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-5 rounded-lg transition-transform duration-300 hover:scale-105">
                                {t('admin.logoutButton')}
                            </button>
                        </div>
                    </form>
                )}

                {message && (
                    <div className={`mt-6 text-center p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                        {message.text}
                    </div>
                )}
                 <div className="text-center mt-8">
                    <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">{t('admin.backToSite')}</a>
                 </div>
            </div>
        </div>
    );
};

export default AdminPanel;