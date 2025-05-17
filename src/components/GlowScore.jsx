import React from 'react';
import PropTypes from 'prop-types';

export default function GlowScore({ hydration, supplements, mood }) {
  // Calculate average glow score
  const score = Math.round((hydration + supplements + mood) / 3);

  // Determine level
  let levelText = 'Needs Focus';
  let levelEmoji = '⚠️';
  if (score >= 80) {
    levelText = 'Peak Glow';
    levelEmoji = '✨';
  } else if (score >= 60) {
    levelText = 'Getting Brighter';
    levelEmoji = '🌟';
  }

  return (
    <div className="p-4 bg-white/80 backdrop-blur-md rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-2 text-brand">Glow Score</h2>
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand to-[#7DCFB6] flex items-center justify-center">
          <span className="text-white text-xl font-bold">{score}%</span>
        </div>
        <div>
          <p className="text-sm">{levelEmoji} {levelText}</p>
          <p className="text-xs text-gray-500">Based on hydration, supplements, mood</p>
        </div>
      </div>
    </div>
  );
}

GlowScore.propTypes = {
  hydration: PropTypes.number.isRequired,
  supplements: PropTypes.number.isRequired,
  mood: PropTypes.number.isRequired,
};
