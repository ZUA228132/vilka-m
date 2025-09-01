import React from 'react';

export const RuStoreIcon: React.FC = () => (
    <svg className="w-8 h-8" viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="rustore-gradient" x1="44" y1="0" x2="44" y2="88" gradientUnits="userSpaceOnUse">
                <stop stopColor="#00A1FF"/>
                <stop offset="1" stopColor="#005CFF"/>
            </linearGradient>
        </defs>
        <path fillRule="evenodd" clipRule="evenodd" d="M48.12 6.6499C45.54 5.3999 42.46 5.3999 39.88 6.6499L12.38 20.3799C10.03 21.5099 8.5 23.8399 8.5 26.4199V61.5799C8.5 64.1599 10.03 66.4899 12.38 67.6199L39.88 81.3499C42.46 82.5999 45.54 82.5999 48.12 81.3499L75.62 67.6199C77.97 66.4899 79.5 64.1599 79.5 61.5799V26.4199C79.5 23.8399 77.97 21.5099 75.62 20.3799L48.12 6.6499Z" fill="url(#rustore-gradient)"/>
        <path d="M44 54.43C50.28 54.43 55.4 49.31 55.4 43.03V34.87H49.12V43.03C49.12 46.43 46.84 49.27 44 49.27C41.16 49.27 38.88 46.43 38.88 43.03V34.87H32.6V43.03C32.6 49.31 37.72 54.43 44 54.43Z" fill="white"/>
    </svg>
);