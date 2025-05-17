// DailyHabits.jsx
import React, { useEffect, useState } from 'react';

export default function DailyHabits({ habits = [], userId }) {
  const [habitState, setHabitState] = useState({});

  useEffect(() => {
    const initialState = habits.reduce((acc, h) => {
      acc[h] = false;
      return acc;
    }, {});
    setHabitState(initialState);
  }, [habits]);

  const toggleHabit = (habit) => {
    setHabitState((prev) => ({ ...prev, [habit]: !prev[habit] }));
  };

  return (
    <div className="bg-white/90 dark:bg-[#1e1e1e] border p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-3 text-[#7DCFB6]">Daily Habits</h2>
      <ul className="space-y-2">
        {habits.map((habit) => (
          <li key={habit} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={habitState[habit] || false}
              onChange={() => toggleHabit(habit)}
              className="accent-[#7DCFB6]"
            />
            <span className="text-sm font-medium">{habit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
