// BadgeHistoryPage.jsx
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function BadgeHistoryPage() {
  const [records, setRecords] = useState([]);
  const [allRecords, setAllRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadgeHistory = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      try {
        const db = getFirestore();
        const ref = doc(db, 'badgeHistory', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const fullData = snap.data().records || [];
          setAllRecords(fullData);
          setRecords(fullData);
        } else {
          console.warn('No badge history found for user.');
        }
      } catch (error) {
        console.error('Error fetching badge history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBadgeHistory();
  }, []);

  if (loading) return <div className="p-6 text-center text-muted">Loading badge history...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto print:bg-white print:text-black print:shadow-none">
      <h1 className="text-2xl font-bold text-brand mb-4">📜 Full Badge History</h1>
      <div className="mb-4 text-sm text-muted print:text-black">
        <div className="w-full max-w-xs mb-4">
          <svg viewBox="0 0 400 100" width="100%" height="60">
            <text x="-10" y="10" fontSize="8" transform="rotate(-90 0 50)" fill="#888">Badges Earned</text>
            <defs>
              <linearGradient id="badgeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#20dfae" />
                <stop offset="100%" stopColor="#0ba894" />
              </linearGradient>
            </defs>
            <line x1="0" y1="60" x2="400" y2="60" stroke="#eee" strokeWidth="1" strokeDasharray="4 2" />
            <polyline
              fill="none"
              stroke="url(#badgeGradient)"
              strokeWidth="3"
              points={records.map((r, i) => `${i * 40},${100 - (Object.values(r.badges).filter(Boolean).length * 20)}`).join(' ')}
            />
            {records.map((r, i) => (
              <circle
                key={i}
                cx={i * 40}
                cy={100 - (Object.values(r.badges).filter(Boolean).length * 20)}
                r="4"
                fill="#20dfae"
              >
                <title>{`Week ${i + 1}: ${Object.values(r.badges).filter(Boolean).length} badges`}</title>
              </circle>
            ))}
            {records.map((r, i) => (
              <text
                key={"label" + i}
                x={i * 40}
                y="98"
                fontSize="8"
                textAnchor="middle"
                fill="#888"
              >
                W{i + 1}
              </text>
            ))}
          </svg>
          <p className="text-xs text-gray-500 mt-1">Badge progress trend (dots show total earned per week)</p>
        </div>
        <p><strong>User:</strong> {getAuth().currentUser?.email || 'N/A'}</p>
        <p><strong>Exported:</strong> {new Date().toLocaleString()}</p>
        <p><strong>Total Weeks:</strong> {records.length}</p>
        <p><strong>Total Earned Badges:</strong> {
          records.reduce((count, r) => count + Object.values(r.badges).filter(Boolean).length, 0)
        }</p>
      </div>
      <div className="flex justify-end mb-4 hidden print:hidden">
        <button
          className="text-sm px-3 py-1 border rounded bg-brand text-white hover:bg-opacity-90"
          onClick={() => window.print()}
        >
          Download as PDF
        </button>
      </div>
      <div className="flex flex-wrap justify-end gap-2 mb-4 hidden print:hidden">
        <button
          className="text-sm px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
          onClick={() => setRecords(allRecords.filter(r => Object.values(r.badges).some(Boolean)))}
        >
          Show Earned Only
        </button>
        <button
          className="text-sm px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200"
          onClick={() => setRecords(allRecords)}
        >
          Reset Filter
        </button>
      </div>
      {records.length === 0 ? (
        <div className="text-center text-muted text-sm">No badges earned yet. Complete your Smart Start plan to begin tracking progress.</div>
      ) : (
        <ul className="space-y-4 text-sm">
          {records.map((entry, i) => (
            <li key={i} className="p-4 border rounded-lg bg-white shadow-sm">
              <p className="mb-2 text-muted">📅 {new Date(entry.timestamp).toLocaleDateString()}</p>
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(entry.badges).map(([badge, earned]) => (
                  <li
                    key={badge}
                    className={`text-center text-xs p-2 rounded border ${earned ? 'bg-green-50 border-green-200 text-green-800' : 'bg-gray-50 border-gray-200 text-gray-400 opacity-60'}`}
                  >
                    {badge === 'radiantGlow' && '✨ Radiant Glow'}
                    {badge === 'hydrationHero' && '💧 Hydration Hero'}
                    {badge === 'consistencyChamp' && '📅 Consistency Champ'}
                    {badge === 'mindsetMaster' && '🧘 Mindset Master'}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
