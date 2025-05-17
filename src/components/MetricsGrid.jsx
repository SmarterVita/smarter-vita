// src/components/MetricsGrid.jsx
import React from 'react';
import GlowScore from './GlowScore';
import HydrationTracker from './HydrationTracker';
import MindResetCard from './MindResetCard';

export default function MetricsGrid({ hydration, supplements, mood, streakDays }) {
  return (
    <div className="grid md:grid-cols-3 gap-lg">
      <GlowScore
        hydration={hydration}
        supplements={supplements}
        mood={mood}
      />
      <HydrationTracker
        hydration={hydration}
        supplements={supplements}
        mood={mood}
        streakDays={streakDays}
      />
      <MindResetCard />
    </div>
  );
}
