// components/SmartStartWizard.jsx
import React, { useState } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function SmartStartWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goals: [],
    blockers: [],
    lifestyle: []
  });

  const toggleOption = (type, value) => {
    setFormData(prev => {
      const list = prev[type];
      return {
        ...prev,
        [type]: list.includes(value)
          ? list.filter(v => v !== value)
          : [...list, value]
      };
    });
  };

  const renderOptions = (type, options) => (
    <div className="grid grid-cols-2 gap-3">
      {options.map(option => (
        <button
          key={option}
          className={`p-2 border rounded-xl text-sm ${
            formData[type].includes(option)
              ? 'bg-brand text-white'
              : 'bg-white text-text-primary'
          }`}
          onClick={() => toggleOption(type, option)}
        >
          {option}
        </button>
      ))}
    </div>
  );

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="bg-white border-b p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-2 text-brand">Let's personalize your Smarter Vita Plan</h2>
      <p className="text-sm text-muted mb-4">Step {step} of 3</p>

      {step === 1 && (
        <div>
          <p className="mb-2 font-medium">What do you want to feel more of?</p>
          {renderOptions('goals', [
            'Energy', 'Calm', 'Focus', 'Confidence',
            'Balance', 'Motivation', 'Lightness', 'Glow'
          ])}
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="mb-2 font-medium">What’s slowing you down right now?</p>
          {renderOptions('blockers', [
            'Bloat', 'Fatigue', 'Stress', 'Cravings',
            'PMS', 'Brain Fog', 'Poor Sleep'
          ])}
        </div>
      )}

      {step === 3 && (
        <div>
          <p className="mb-2 font-medium">How do you want to live smarter this month?</p>
          {renderOptions('lifestyle', [
            'Eat with intention',
            'Stay on track with supplements',
            'Sleep like a goddess',
            'Align my mood and mindset'
          ])}
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button onClick={prevStep} className="text-sm text-muted">Back</button>
        {step < 3 ? (
          <button onClick={nextStep} className="bg-brand text-white px-4 py-2 rounded-xl text-sm">Next</button>
        ) : (
          <button
            onClick={async () => {
              const db = getFirestore();
              const auth = getAuth();
              const user = auth.currentUser;
              if (user) {
                await setDoc(doc(db, 'smartStartPlans', user.uid), formData);
                window.location.href = '/smart-start-summary';
              } else {
                alert('Please log in to save your plan.');
              }
            }}
            className="bg-brand text-white px-4 py-2 rounded-xl text-sm"
          >
            Start My Plan
          </button>
        )}
      </div>
    </div>
  );
}
