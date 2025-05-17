import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function useDashboardData() {
  const [glowScores, setGlowScores] = useState([]);
  const [progress, setProgress] = useState({
    hydration: null,
    mood: null,
    supplements: null,
    streakDays: null,
  });
  const [supplementSuggestions, setSupplementSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [justUnlocked, setJustUnlocked] = useState(false);

  useEffect(() => {
    const user = getAuth().currentUser;
    if (!user) {
      setError('User not logged in');
      setLoading(false);
      return;
    }
    const db = getFirestore();

    const fetchAll = async () => {
      try {
        const [glowSnap, progSnap, stackSnap] = await Promise.all([
          getDoc(doc(db, 'glowScores', user.uid)),
          getDoc(doc(db, 'dailyProgress', user.uid)),
          getDoc(doc(db, 'supplementMatches', user.uid)),
        ]);

        setGlowScores(glowSnap.exists() ? glowSnap.data().weeks || [] : []);
        if (progSnap.exists()) {
          const d = progSnap.data();
          setProgress({
            hydration: d.hydration ?? 70,
            mood: d.mood ?? 80,
            supplements: d.supplements ?? 60,
            streakDays: d.streak ?? 1,
          });
        }
        setSupplementSuggestions(stackSnap.exists() ? stackSnap.data().top || [] : []);

        const latest = (glowSnap.data()?.weeks || []).slice(-1)[0] || 0;
        if (latest >= 80) {
          setJustUnlocked(true);
          setTimeout(() => setJustUnlocked(false), 5000);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { glowScores, progress, supplementSuggestions, loading, error, justUnlocked };
}
