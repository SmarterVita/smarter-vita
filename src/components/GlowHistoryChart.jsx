// GlowHistoryChart.jsx – Premium Trendline with Animations, Indicator + GPT Tip
import React from 'react';
import { motion } from 'framer-motion';

export default function GlowHistoryChart({ scores = [] }) {
  const maxScore = 100;
  const height = 100;
  const width = 300;
  const gap = width / (scores.length - 1 || 1);
  const points = scores.map((s, i) => `${i * gap},${height - (s / maxScore) * height}`).join(' ');
  const latestScore = scores[scores.length - 1] || 0;

  const tip = latestScore >= 80
    ? '✨ Excellent glow retention. Let’s reinforce hydration and protein intake.'
    : latestScore >= 60
    ? '🌿 Doing well! A short evening walk and early water could push you to peak glow.'
    : '⚡ Let’s reclaim your glow — hydrate and review your stack.';

  return (
    <motion.div
      className="bg-white border border-gray-200 p-6 rounded-xl shadow backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-lg font-semibold text-brand mb-2">📈 Glow Trend</h2>
      {scores.length === 0 ? (
        <p className="text-sm text-gray-500">No glow score data yet.</p>
      ) : (
        <>
          <svg width={width} height={height} className="w-full">
            <defs>
              <linearGradient id="glowGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#20dfae" />
                <stop offset="100%" stopColor="#0ba894" />
              </linearGradient>
            </defs>
            <motion.polyline
              fill="none"
              stroke="url(#glowGradient)"
              strokeWidth="3"
              points={points}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2 }}
            />
            {scores.map((s, i) => (
              <motion.circle
                key={i}
                cx={i * gap}
                cy={height - (s / maxScore) * height}
                r="4"
                fill="#20dfae"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <title>Week {i + 1}: {s}%</title>
              </motion.circle>
            ))}
            <line
              x1={(scores.length - 1) * gap}
              y1="0"
              x2={(scores.length - 1) * gap}
              y2={height}
              stroke="#ccc"
              strokeDasharray="4 2"
            />
          </svg>
          <div className="mt-4 p-3 bg-brand/10 text-sm text-brand rounded-md text-center">
            {tip}
          </div>
        </>
      )}
    </motion.div>
  );
}
