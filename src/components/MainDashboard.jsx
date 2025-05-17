// MainDashboard.jsx – VITA Overview Panel
import React from 'react';
import { Link } from 'react-router-dom';

export default function MainDashboard() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-brand mb-6">Welcome to Your Smarter Life ✨</h1>

      <section className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold text-brand mb-2">This Week’s Focus</h2>
        <p className="text-sm text-gray-600 mb-3">VITA suggests: Hydrate early. Avoid 3PM caffeine. Stretch after lunch. Glow from within 🌿</p>
        <Link to="/smart-start" className="text-sm text-brand underline">Update Your Plan →</Link>
      </section>

      <section className="grid sm:grid-cols-2 gap-4">
        <Link to="/badge-history" className="block p-4 bg-gradient-to-br from-green-100 to-white rounded-xl border hover:shadow">
          <h3 className="text-lg font-semibold mb-1">📄 View Progress</h3>
          <p className="text-sm text-gray-600">Track your badges, glow levels, and habits weekly.</p>
        </Link>

        <Link to="/settings" className="block p-4 bg-gradient-to-br from-yellow-100 to-white rounded-xl border hover:shadow">
          <h3 className="text-lg font-semibold mb-1">🔔 Reminders</h3>
          <p className="text-sm text-gray-600">Manage push/email nudges and check-in preferences.</p>
        </Link>

        <Link to="/chat" className="block p-4 bg-gradient-to-br from-blue-100 to-white rounded-xl border hover:shadow">
          <h3 className="text-lg font-semibold mb-1">💬 Ask VITA</h3>
          <p className="text-sm text-gray-600">Get supplement advice based on your symptoms.</p>
        </Link>

        <Link to="/summary" className="block p-4 bg-gradient-to-br from-pink-100 to-white rounded-xl border hover:shadow">
          <h3 className="text-lg font-semibold mb-1">📋 My Plan</h3>
          <p className="text-sm text-gray-600">View your personalized GPT-powered SmartStart plan.</p>
        </Link>
      </section>

      <div className="mt-10 text-center">
        <p className="text-sm text-gray-500">“The smarter you move, the brighter you glow.” – VITA 🧠</p>
      </div>
    </div>
  );
}
