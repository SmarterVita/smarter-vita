// App.jsx – Full VITA Core App (Restored)
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SmartStartSummary from './pages/SmartStartSummary';
import BadgeHistoryPage from './pages/BadgeHistoryPage';
import NotificationSettings from './pages/NotificationSettings';
import MainDashboard from './pages/MainDashboard';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
initializeApp(firebaseConfig);

export default function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <Router>
      <div className="min-h-screen font-sans bg-gray-50 text-gray-900">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-brand">Smarter Vita</h1>
          {user && <span className="text-sm text-gray-600">Hi, {user.email}</span>}
        </header>
        <main className="p-4 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<MainDashboard />} />
            <Route path="/smart-start" element={<SmartStartSummary />} />
            <Route path="/badge-history" element={<BadgeHistoryPage />} />
            <Route path="/settings" element={<NotificationSettings />} />
            <Route path="*" element={<div className="text-center mt-10">404 – Page Not Found</div>} />
          </Routes>
        </main>
        <footer className="fixed bottom-0 w-full bg-white border-t p-2 flex justify-around text-sm sm:hidden">
          <a href="/dashboard" className="text-brand">🏠 Dashboard</a>
          <a href="/badge-history" className="text-brand">📄 Badges</a>
          <a href="/settings" className="text-brand">⚙️ Settings</a>
        </footer>
      </div>
    </Router>
  );
}
