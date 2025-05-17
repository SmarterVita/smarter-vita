// src/components/HistoryAndSupplements.jsx
import React from 'react';
import GlowHistoryChart from './GlowHistoryChart';
import SupplementList from './SupplementList';

export default function HistoryAndSupplements({ glowScores, supplementSuggestions }) {
  return (
    <div className="grid lg:grid-cols-2 gap-lg items-start">
      <div className="bg-white p-md rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-sm">Glow History</h2>
        <GlowHistoryChart scores={glowScores} />
      </div>
      <div className="bg-white p-md rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-sm">Your Precision Stack</h2>
        <SupplementList suggestions={supplementSuggestions} reorderMap={{}} />
      </div>
    </div>
  );
}
