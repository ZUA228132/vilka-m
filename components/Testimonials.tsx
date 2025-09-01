import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  avatarUrl: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, title, avatarUrl }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const rotateX = (y / height - 0.5) * -20;
    const rotateY = (x / width - 0.5) * 20;

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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card-3d card-spotlight bg-gray-800/60 p-8 rounded-xl border border-gray-700/60 flex flex-col h-full transition-all duration-300 hover:border-purple-500/50 hover:bg-gray-800"
    >
      <div className="flex-grow mb-6">
        <p className="text-gray-300 text-lg leading-relaxed">"{quote}"</p>
      </div>
      <div className="flex items-center">
        <img src={avatarUrl} alt={name} className="w-12 h-12 rounded-full mr-4 border-2 border-purple-500" />
        <div>
          <p className="font-bold text-white">{name}</p>
          <p className="text-sm text-gray-400">{title}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const { t } = useLanguage();
  const testimonialsData = t('testimonials.cards', { returnObjects: true }) as TestimonialCardProps[];

  return (
    <section id="testimonials" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-lg text-gray-400">
            {t('testimonials.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;