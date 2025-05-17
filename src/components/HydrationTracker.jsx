// HydrationTracker.jsx – Enhanced Glow Ring UI with Streaks + Dynamic Color
import React from 'react';

export default function HydrationTracker({ hydration = 75, supplements = 60, mood = 90, streakDays = 3 }) {
  const progressCircles = [
    { label: 'Hydration', value: hydration },
    { label: 'Supplements', value: supplements },
    { label: 'Mood', value: mood },
  ];

  const getColor = (value) => {
    if (value >= 80) return '#20dfae';
    if (value >= 50) return '#facc15';
    return '#f87171';
  };

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-brand">Your Progress</h2>
      <div className="flex justify-around gap-4 mb-6">
        {progressCircles.map((item, i) => {
          const dash = 188.4;
          const offset = dash * (1 - item.value / 100);
          const color = getColor(item.value);
          return (
            <div key={i} className="flex flex-col items-center">
              <svg width="72" height="72">
                <circle cx="36" cy="36" r="30" stroke="#EAEAEA" strokeWidth="8" fill="none" />
                <circle
                  cx="36" cy="36"
                  r="30"
                  stroke={color}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={dash}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  transform="rotate(-90 36 36)"
                />
              </svg>
              <p className="text-sm mt-2 font-medium text-center">
                {item.label}<br />{item.value}%
              </p>
            </div>
          );
        })}
      </div>
      <div className="text-center text-sm text-gray-600">
        🔥 You’ve hit your hydration target for <span className="font-bold">{streakDays}</span> days in a row!
      </div>
    </div>
  );
}
