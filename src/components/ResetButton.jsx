// ResetButton.jsx
import React from 'react';

export default function ResetButton({ userId, setChatInput, setChatHistory }) {
  const handleReset = () => {
    const confirmReset = window.confirm("Are you sure you want to reset this week's progress and clear the conversation?");
    if (confirmReset) {
      setChatInput('');
      setChatHistory([]);
      // Optionally: log this event or reset backend state
      console.log(`User ${userId} reset their session.`);
    }
  };

  return (
    <div className="mt-4 text-center">
      <button
        onClick={handleReset}
        className="text-sm text-red-500 underline hover:text-red-600"
      >
        🔁 Reset My Week
      </button>
    </div>
  );
}
