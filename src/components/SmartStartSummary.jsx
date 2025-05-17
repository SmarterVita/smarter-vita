// SmartStartSummary.jsx – Restores Smart Start AI Flow
import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';

export default function SmartStartSummary() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState({ energy: false, calm: false, glow: false });
  const [blocks, setBlocks] = useState({ bloat: false, fatigue: false, stress: false });

  const handleChange = (group, key) => {
    if (group === 'goals') setGoals({ ...goals, [key]: !goals[key] });
    if (group === 'blocks') setBlocks({ ...blocks, [key]: !blocks[key] });
  };

  const generatePlan = async () => {
    setLoading(true);
    const selectedGoals = Object.entries(goals).filter(([k, v]) => v).map(([k]) => k);
    const selectedBlocks = Object.entries(blocks).filter(([k, v]) => v).map(([k]) => k);
    const prompt = `You are VITA, a wellness AI. The user wants to feel: ${selectedGoals.join(', ')}. They’re slowed down by: ${selectedBlocks.join(', ')}. Suggest a personalized plan with supplements, hydration, and a day plan.`;

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_API_KEY`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are VITA, an AI wellness strategist.' },
            { role: 'user', content: prompt }
          ]
        })
      });
      const data = await res.json();
      const reply = data.choices[0].message.content;
      setSummary(reply);
    } catch (err) {
      setSummary('There was an error generating your plan.');
    }
    setLoading(false);
  };

  const exportToPDF = () => {
    const element = document.getElementById('vita-summary');
    if (element) html2pdf().from(element).save('SmartStart_Plan.pdf');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4 text-brand">🧠 Let’s Personalize Your Smart Start</h1>

      <div className="mb-4">
        <p className="font-medium">What do you want to feel more of?</p>
        <div className="flex gap-2 flex-wrap">
          {['energy', 'calm', 'glow'].map(key => (
            <label key={key} className="text-sm">
              <input type="checkbox" checked={goals[key]} onChange={() => handleChange('goals', key)} /> {key}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="font-medium">What’s slowing you down?</p>
        <div className="flex gap-2 flex-wrap">
          {['bloat', 'fatigue', 'stress'].map(key => (
            <label key={key} className="text-sm">
              <input type="checkbox" checked={blocks[key]} onChange={() => handleChange('blocks', key)} /> {key}
            </label>
          ))}
        </div>
      </div>

      <button onClick={generatePlan} disabled={loading} className="bg-brand text-white px-4 py-2 rounded">
        {loading ? 'Generating…' : 'Generate My Plan'}
      </button>

      {summary && (
        <div className="mt-6 bg-white border rounded p-4 shadow" id="vita-summary">
          <h2 className="text-lg font-bold mb-2 text-brand">Your Smart Start Plan</h2>
          <pre className="whitespace-pre-wrap text-sm">{summary}</pre>
          <button onClick={exportToPDF} className="mt-4 text-sm underline text-brand">Download as PDF</button>
        </div>
      )}
    </div>
  );
}
