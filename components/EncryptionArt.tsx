import React from 'react';

export const EncryptionArt: React.FC = () => {
    return (
        <div className="w-full max-w-md mx-auto">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                     <filter id="glow">
                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Outer rings */}
                <circle cx="100" cy="100" r="90" fill="none" stroke="#374151" strokeWidth="1" />
                <circle cx="100" cy="100" r="75" fill="none" stroke="#4b5563" strokeWidth="0.5" />
                
                {/* Central Lock Icon */}
                <g transform="translate(88, 88) scale(1.2)">
                     <rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="none" stroke="#a855f7" strokeWidth="1.5" filter="url(#glow)"></rect>
                     <path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke="#a855f7" strokeWidth="1.5" filter="url(#glow)"></path>
                </g>

                {/* Animated data packets */}
                <g>
                    <circle cx="100" cy="100" r="3" fill="url(#line-gradient)">
                        <animateMotion dur="6s" repeatCount="indefinite" path="M100,20 a80,80 0 1,1 0,160 a80,80 0 1,1 0,-160" />
                    </circle>
                     <circle cx="100" cy="100" r="3" fill="url(#line-gradient)">
                        <animateMotion dur="8s" repeatCount="indefinite" path="M100,20 a80,80 0 1,1 0,160 a80,80 0 1,1 0,-160" begin="-2s" />
                    </circle>
                    <circle cx="100" cy="100" r="3" fill="url(#line-gradient)">
                        <animateMotion dur="7s" repeatCount="indefinite" path="M140,41.3 a65,65 0 1,1 -80,117.3 a65,65 0 1,1 80,-117.3" begin="-4s" />
                    </circle>
                </g>
                
                {/* Dashed rotating ring */}
                <circle cx="100" cy="100" r="60" fill="none" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="5 10" opacity="0.6">
                    <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="20s" repeatCount="indefinite" />
                </circle>
                <circle cx="100" cy="100" r="60" fill="none" stroke="url(#line-gradient)" strokeWidth="2" strokeDasharray="5 10" opacity="0.6">
                    <animateTransform attributeName="transform" type="rotate" from="360 100 100" to="0 100 100" dur="25s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    );
};
