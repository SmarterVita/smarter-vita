// src/components/ActionTiles.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function ActionTiles() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-lg pt-lg">
      <Link
        to="/smart-start"
        className="block bg-brand-light text-brand p-md rounded-lg shadow-brand-md hover:shadow-lg transition"
      >
        ✨ Update Smart Start Plan
      </Link>
      <Link
        to="/settings"
        className="block bg-yellow-100 text-yellow-800 p-md rounded-lg shadow-md hover:shadow-lg transition"
      >
        🔔 Manage Notifications
      </Link>
      <Link
        to="/chat"
        className="block bg-blue-100 text-blue-800 p-md rounded-lg shadow-md hover:shadow-lg transition"
      >
        💬 Ask VITA AI
      </Link>
      <Link
        to="/badge-history"
        className="block bg-green-100 text-green-800 p-md rounded-lg shadow-md hover:shadow-lg transition"
      >
        🏅 View Your Badges
      </Link>
    </div>
  );
}
