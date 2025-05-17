// MainDashboard.jsx – Production-Ready Smart VITA Dashboard with Visual Polish + Loading States
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import GlowScore from '../components/GlowScore';
import GlowHistoryChart from '../components/GlowHistoryChart';
import HydrationTracker from '../components/HydrationTracker';
import SupplementList from '../components/SupplementList';
import { Link } from 'react-router-dom';

export default function MainDashboard() {
  const [glowScores, setGlowScores] = useState([]);
  const [hydration, setHydration] = useState(null);
  const [supplements, setSupplements] = useState(null);
  const [mood, setMood] = useState(null);
  const [streakDays, setStreakDays] = useState(null);
  const [supplementSuggestions, setSupplementSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getAuth().currentUser;
    if (!user) return;
    const db = getFirestore();

    const fetchData = async () => {
      try {
        const glowSnap = await getDoc(doc(db, 'glowScores', user.uid));
        if (glowSnap.exists()) setGlowScores(glowSnap.data().weeks || []);

        const progressSnap = await getDoc(doc(db, 'dailyProgress', user.uid));
        if (progressSnap.exists()) {
          const data = progressSnap.data();
          setHydration(data.hydration ?? 70);
          setMood(data.mood ?? 80);
          setSupplements(data.supplements ?? 60);
          setStreakDays(data.streak ?? 1);
        }

        const stackSnap = await getDoc(doc(db, 'supplementMatches', user.uid));
        if (stackSnap.exists()) setSupplementSuggestions(stackSnap.data().top || []);

      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || hydration === null || supplements === null || mood === null || streakDays === null) {
    return (
      <div className="p-6 max-w-5xl mx-auto text-center space-y-4">
        <div className="animate-pulse space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand to-[#20dfae] shadow-md flex items-center justify-center">
              <span className="text-white text-2xl font-bold">V</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">🧠 VITA is optimizing your dashboard…</p>
          <p className="text-sm text-brand italic">“The smarter you move, the brighter you glow.”</p>
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-40 bg-gray-100 rounded-xl" />
            <div className="h-40 bg-gray-100 rounded-xl" />
          </div>
          <div className="h-6 bg-gray-200 rounded w-1/3 mt-4" />
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="h-20 bg-gray-100 rounded-xl" />
            <div className="h-20 bg-gray-100 rounded-xl" />
            <div className="h-20 bg-gray-100 rounded-xl" />
            <div className="h-20 bg-gray-100 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="p-4 space-y-6 max-w-5xl mx-auto bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-3xl font-bold text-brand mb-4 tracking-tight">Welcome Back ✨</h1>

      <GlowScore hydration={hydration} supplements={supplements} mood={mood} />
      <GlowHistoryChart scores={glowScores} />

      <div className="grid md:grid-cols-2 gap-6">
        <HydrationTracker hydration={hydration} supplements={supplements} mood={mood} streakDays={streakDays} />
        <SupplementList suggestions={supplementSuggestions} reorderMap={{}} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 pt-6">
        <Link to="/smart-start" className="block bg-gradient-to-tr from-brand/20 to-brand/5 text-brand p-5 rounded-xl shadow-lg hover:shadow-xl">
          ✨ Update Smart Start Plan
        </Link>
        <Link to="/settings" className="block bg-yellow-100 text-yellow-800 p-5 rounded-xl shadow-lg hover:shadow-xl">
          🔔 Manage Notifications
        </Link>
        <Link to="/chat" className="block bg-blue-100 text-blue-800 p-5 rounded-xl shadow-lg hover:shadow-xl">
          💬 Ask VITA AI
        </Link>
        <Link to="/badge-history" className="block bg-green-100 text-green-800 p-5 rounded-xl shadow-lg hover:shadow-xl">
          🏅 View Your Badges
        </Link>
      </div>
    </motion.div>
  );
}
