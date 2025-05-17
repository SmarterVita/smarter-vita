// SupplementList.jsx – GPT-Based Recommendations with Reorder Logic
import React from 'react';

export default function SupplementList({ suggestions = [], reorderMap = {} }) {
  return (
    <div className="bg-white border p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold text-brand mb-2">💊 Your Precision Stack</h2>
      {suggestions.length === 0 ? (
        <p className="text-sm text-gray-500">Ask VITA a symptom to get matches.</p>
      ) : (
        <ul className="space-y-2 text-sm">
          {suggestions.map((item, i) => (
            <li
              key={i}
              className="p-3 bg-gray-50 border border-gray-200 rounded-md flex justify-between items-center"
            >
              <span>{item.name}</span>
              {reorderMap[item.name] > 1 && (
                <span className="text-xs text-green-600">🔁 Suggested again</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
