// NotificationSettings.jsx – Toggle push/email preferences
import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function NotificationSettings() {
  const [prefs, setPrefs] = useState({ glowCheckin: false, nudgeTips: false });
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const db = getFirestore();
    const ref = doc(db, 'notificationPrefs', user.uid);

    getDoc(ref).then((snap) => {
      if (snap.exists()) setPrefs(snap.data());
      setLoading(false);
    });
  }, [user]);

  const toggle = async (key) => {
    const newPrefs = { ...prefs, [key]: !prefs[key] };
    setPrefs(newPrefs);
    await setDoc(doc(getFirestore(), 'notificationPrefs', user.uid), newPrefs);
  };

  if (!user) return <div className="p-6 text-center">Please sign in to manage your notifications.</div>;
  if (loading) return <div className="p-6 text-center">Loading preferences…</div>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-brand mb-4">🔔 Notification Preferences</h1>
      <ul className="space-y-4 text-sm">
        <li className="flex items-center justify-between">
          <span>📅 Weekly Glow Check-In</span>
          <input type="checkbox" checked={prefs.glowCheckin} onChange={() => toggle('glowCheckin')} />
        </li>
        <li className="flex items-center justify-between">
          <span>💡 Daily Nudge Tips</span>
          <input type="checkbox" checked={prefs.nudgeTips} onChange={() => toggle('nudgeTips')} />
        </li>
      </ul>
    </div>
  );
}
