'use client';

import React from 'react';

const HeroFallback: React.FC = () => {
    return (
        <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-500"></div>
                <p className="text-gray-400 mt-4">Loading immersive experience...</p>
            </div>
        </div>
    );
};

export default HeroFallback;
