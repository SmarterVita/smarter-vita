// useUserProfile.js
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function useUserProfile() {
  const [autoshipActive, setAutoshipActive] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const profileRef = doc(db, 'userProfiles', user.uid);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          const userData = profileSnap.data();
          setAutoshipActive(userData.autoshipActive);
        } else {
          setAutoshipActive(false);
        }
      } else {
        setUserId(null);
        setAutoshipActive(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { autoshipActive, userId };
}
