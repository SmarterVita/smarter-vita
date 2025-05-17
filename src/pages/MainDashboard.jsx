import React from 'react';
import { motion } from 'framer-motion';
import useDashboardData from '../hooks/useDashboardData';
import DashboardLoader from '../components/DashboardLoader';
import HeroHeader from '../components/HeroHeader';
import DailyGlowTip from '../components/DailyGlowTip';
import GlowScore from '../components/GlowScore';
import HydrationTracker from '../components/HydrationTracker';
import MindResetCard from '../components/MindResetCard';
import GlowHistoryChart from '../components/GlowHistoryChart';
import SupplementList from '../components/SupplementList';
import ActionTiles from '../components/ActionTiles';

export default function MainDashboard() {
  const {
    glowScores,
    progress: { hydration, mood, supplements, streakDays },
    supplementSuggestions,
    loading,
    error,
    justUnlocked,
  } = useDashboardData();

  if (loading) return <DashboardLoader />;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <motion.div
      className="p-6 space-y-8 max-w-5xl mx-auto bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <HeroHeader justUnlocked={justUnlocked} />
      <DailyGlowTip />
      <div className="grid md:grid-cols-3 gap-6">
        <GlowScore hydration={hydration} supplements={supplements} mood={mood} />
        <HydrationTracker hydration={hydration} supplements={supplements} mood={mood} streakDays={streakDays} />
        <MindResetCard />
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <GlowHistoryChart scores={glowScores} />
        <SupplementList suggestions={supplementSuggestions} reorderMap={{}} />
      </div>
      <ActionTiles />
    </motion.div>
  );
}
