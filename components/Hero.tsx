import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ChatBubble = ({ text, isSender, delay }: { text: string, isSender: boolean, delay: number }) => (
    <div
        className={`flex w-full ${isSender ? 'justify-end' : 'justify-start'}`}
        style={{ animationDelay: `${delay}s` }}
    >
        <div
            className={`chat-bubble-animate max-w-[80%] rounded-2xl px-4 py-2.5 text-white ${isSender ? 'bg-gradient-to-br from-purple-600 to-indigo-600 rounded-br-lg' : 'bg-gray-700 rounded-bl-lg'}`}
        >
            {text}
        </div>
    </div>
);

const TypingIndicator = ({ delay }: { delay: number }) => (
    <div className="flex justify-start chat-bubble-animate" style={{ animationDelay: `${delay}s` }}>
        <div className="bg-gray-700 rounded-2xl rounded-bl-lg px-4 py-3.5 flex items-center space-x-1.5">
            <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></span>
        </div>
    </div>
);

const MatrixColumn = ({ content, duration, left }: { content: string, duration: number, left: string }) => (
    <div className="matrix-col" style={{ animationDuration: `${duration}s`, left }}>
        {content}
    </div>
);

const AnimatedTitle = ({ textLines }: { textLines: string[] }) => {
    return (
        <>
            {textLines.map((line, lineIndex) => (
                <span key={lineIndex} className="hero-title-line">
                    <span style={{ animationDelay: `${lineIndex * 0.15}s` }}>
                        {line}
                    </span>
                </span>
            ))}
        </>
    );
};

const Hero: React.FC = () => {
    const { t } = useLanguage();

    const messages = t('hero.chatMessages', { returnObjects: true }) as { text: string, isSender: boolean, delay: number }[];
    const finalMessage = t('hero.finalMessage', { returnObjects: true }) as { text: string, isSender: boolean, delay: number };

    const matrixContent = "VilkaEncrypt//: VilkaEncrypt//: VilkaEncrypt//: VilkaEncrypt//: VilkaEncrypt//: VilkaEncrypt//: VilkaEncrypt//: VilkaEncrypt//: ";

    return (
        <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32">
            <div 
                className="container mx-auto px-6 text-center"
                style={{ transform: `translateY(calc(var(--scroll-y, 0) * 0.3px))` }}
            >
                <div className="max-w-4xl mx-auto">
                    <div className="inline-block bg-purple-500/10 text-purple-400 text-sm font-semibold py-1 px-4 rounded-full mb-6">
                        {t('hero.badge')}
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tighter mb-6 leading-tight">
                        <AnimatedTitle textLines={[t('hero.title.line1')]} />
                        <span className="text-shimmer bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500 hero-title-line">
                           <span style={{ animationDelay: `0.3s` }}>{t('hero.title.line2')}</span>
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        {t('hero.description')}
                    </p>
                    <div className="flex justify-center items-center gap-4 flex-wrap">
                        <a href="#download" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-900/50 hover:shadow-purple-500/40">
                            {t('hero.ctaPrimary')}
                        </a>
                        <a href="#features" className="bg-gray-800/50 hover:bg-gray-700/80 border border-gray-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300">
                            {t('hero.ctaSecondary')}
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-16 md:mt-24 relative flex justify-center">
                {/* Phone Mockup */}
                <div className="phone-breathing w-[280px] h-[570px] sm:w-[320px] sm:h-[650px] md:w-[350px] md:h-[712px] bg-gray-900/70 backdrop-blur-sm p-2.5 rounded-[40px] border border-gray-700">
                    <div className="w-full h-full bg-gray-900 rounded-[30px] overflow-hidden relative">
                        {/* Inner screen content */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1c3a] to-[#0c0d1c] p-4 flex flex-col z-10">
                            {/* Chat Header */}
                            <div className="flex-shrink-0 flex items-center pb-3 border-b border-gray-700/50">
                                <img src="https://picsum.photos/seed/avatar1/40/40" alt="Avatar" className="w-10 h-10 rounded-full" />
                                <div className="ml-3">
                                    <p className="font-semibold text-white">{t('hero.chatHeader.name')}</p>
                                    <p className="text-sm text-green-400">{t('hero.chatHeader.status')}</p>
                                </div>
                            </div>
                            {/* Chat Messages */}
                            <div className="flex-grow pt-4 space-y-4 overflow-y-auto">
                                {messages.map((msg, index) => (
                                    <ChatBubble key={index} text={msg.text} isSender={msg.isSender} delay={msg.delay} />
                                ))}
                                <TypingIndicator delay={3.5} />
                                <ChatBubble text={finalMessage.text} isSender={finalMessage.isSender} delay={finalMessage.delay} />
                            </div>
                        </div>
                        {/* Matrix Background */}
                        <div className="matrix-bg z-0">
                            <MatrixColumn content={matrixContent} duration={10} left="0%" />
                            <MatrixColumn content={matrixContent} duration={12} left="10%" />
                            <MatrixColumn content={matrixContent} duration={8} left="20%" />
                            <MatrixColumn content={matrixContent} duration={14} left="30%" />
                            <MatrixColumn content={matrixContent} duration={9} left="40%" />
                            <MatrixColumn content={matrixContent} duration={11} left="50%" />
                            <MatrixColumn content={matrixContent} duration={13} left="60%" />
                            <MatrixColumn content={matrixContent} duration={7} left="70%" />
                            <MatrixColumn content={matrixContent} duration={15} left="80%" />
                            <MatrixColumn content={matrixContent} duration={9} left="90%" />
                        </div>
                    </div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;