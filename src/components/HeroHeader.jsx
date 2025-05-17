// src/components/HeroHeader.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

export default function HeroHeader({ justUnlocked }) {
  return (
    <div className="text-center space-y-sm">
      <h1 className="text-4xl font-extrabold text-brand tracking-tight">
        Welcome Back, Jordan ✨
      </h1>
      <p className="text-lg text-gray-700">
        <span className="font-semibold">Smarter Wellness. Real Results.</span><br />
        <span className="italic text-brand-light">Reimagined for the Whole You.</span>
      </p>
      <AnimatePresence>
        {justUnlocked && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
