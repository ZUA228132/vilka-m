import React from 'react';
import { LockIcon } from './icons/LockIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { ZapIcon } from './icons/ZapIcon';
import { GhostIcon } from './icons/GhostIcon';
import { useLanguage } from '../contexts/LanguageContext';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const rotateX = (y / height - 0.5) * -24; // Increased intensity
    const rotateY = (x / width - 0.5) * 24; // Increased intensity

    cardRef.current.style.setProperty('--spotlight-x', `${x}px`);
    cardRef.current.style.setProperty('--spotlight-y', `${y}px`);
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
  };

  return (
    <div 
      className="gradient-border-wrap card-spotlight" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={cardRef} className="card-3d gradient-border h-full">
        <div className="group bg-gray-800/80 p-6 rounded-xl h-full flex flex-col relative overflow-hidden">
           <div className="card-inner-pattern" />
           <div className="relative z-10 flex flex-col flex-grow">
              <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-purple-600/20 text-purple-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                {icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-gray-400 flex-grow">{description}</p>
           </div>
        </div>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const { t } = useLanguage();
  const featuresData = [
    {
      icon: <LockIcon />,
      title: t('features.cards.0.title'),
      description: t('features.cards.0.description'),
    },
    {
      icon: <ShieldIcon />,
      title: t('features.cards.1.title'),
      description: t('features.cards.1.description'),
    },
    {
      icon: <GhostIcon />,
      title: t('features.cards.2.title'),
      description: t('features.cards.2.description'),
    },
    {
      icon: <ZapIcon />,
      title: t('features.cards.3.title'),
      description: t('features.cards.3.description'),
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-gray-400">
            {t('features.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;