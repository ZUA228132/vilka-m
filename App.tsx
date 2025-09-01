import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Security from './components/Security';
import Testimonials from './components/Testimonials';
import Download from './components/Download';
import Footer from './components/Footer';
import AnimatedSection from './components/AnimatedSection';
import AdminPanel from './components/AdminPanel';
import CursorFollower from './components/CursorFollower';
import { useLanguage } from './contexts/LanguageContext';

const MainSite: React.FC = () => (
  <>
    <Header />
    <div className="relative z-10">
      <main>
        <Hero />
        <AnimatedSection><Features /></AnimatedSection>
        <AnimatedSection><Security /></AnimatedSection>
        <AnimatedSection><Testimonials /></AnimatedSection>
        <AnimatedSection><Download /></AnimatedSection>
      </main>
      <Footer />
    </div>
  </>
);

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const root = document.documentElement;
    let scrollTicking = false;
    let mouseTicking = false;

    const handleScroll = () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(() => {
          root.style.setProperty('--scroll-y', window.scrollY.toString());
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
       if(!mouseTicking) {
          window.requestAnimationFrame(() => {
              root.style.setProperty('--mouse-x', `${e.clientX}px`);
              root.style.setProperty('--mouse-y', `${e.clientY}px`);
              mouseTicking = false;
          });
          mouseTicking = true;
       }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    root.style.setProperty('--scroll-y', window.scrollY.toString());

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);
  
  return (
     <div 
      className="overflow-x-hidden relative"
      style={{
        background: `linear-gradient(-45deg, #0a0a1a, #0d0124, #1a1c3a, #0a0a1a)`,
        backgroundSize: '400% 400%',
        animation: 'animated-gradient 25s ease infinite'
      }}
    >
      <CursorFollower />

      {/* Background Grid */}
      <div 
          className="fixed inset-0 z-0 interactive-grid" 
          style={{
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
          }}
      ></div>

      {/* Scanline Overlay */}
      <div className="scanline-overlay"></div>

      <div 
        className="fixed top-[-30rem] left-[-30rem] w-[70rem] h-[70rem] bg-purple-900/20 rounded-full filter blur-3xl opacity-40"
        style={{ transform: `translateY(calc(var(--scroll-y, 0) * 0.25px))` }}
      ></div>
      <div 
        className="fixed bottom-[-30rem] right-[-30rem] w-[70rem] h-[70rem] bg-teal-800/20 rounded-full filter blur-3xl opacity-40"
        style={{ transform: `translateY(calc(var(--scroll-y, 0) * 0.15px))` }}
      ></div>
      
      {children}
    </div>
  )
}

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <AppLayout>
      {route === '#admin' ? <AdminPanel /> : <MainSite />}
    </AppLayout>
  );
};

export default App;