// useVitaChat.js
import { useState } from 'react';
import html2pdf from 'html2pdf.js';

export default function useVitaChat() {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('English');
  const [reorderMap, setReorderMap] = useState({});
  const [supplements, setSupplements] = useState([]); // This could be fetched from backend or Firebase later

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;
    setIsLoading(true);
    setChatHistory(prev => [...prev, { type: 'user', text: chatInput }]);

    try {
      const systemPrompt = `You are VITA, a wellness AI assistant. Match the user's symptoms to products from the following list. Return top 3-5 supplement matches with reasons. Then ask if the user would like a 1-day meal plan, shopping list, and hydration advice. Use ${language}.`;
      const response = await fetch("https://YOUR_SECURE_BACKEND_PROXY/api/vita-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          symptoms: chatInput,
          supplements
        })
      });

      const data = await response.json();
      const reply = data.message || "Sorry, something went wrong.";
      setChatHistory(prev => [...prev, { type: 'vita', text: reply }]);

      const lowerText = reply.toLowerCase();
      const updatedReorderMap = { ...reorderMap };
      supplements.forEach((s) => {
        if (lowerText.includes(s.name.toLowerCase())) {
          updatedReorderMap[s.name] = (updatedReorderMap[s.name] || 0) + 1;
        }
      });
      setReorderMap(updatedReorderMap);

    } catch (error) {
      setChatHistory(prev => [...prev, { type: 'vita', text: 'Failed to connect to GPT.' }]);
    }

    setChatInput('');
    setIsLoading(false);
  };

  const exportToPDF = () => {
    const element = document.getElementById('vita-summary');
    if (element) html2pdf().from(element).save('VITA_Recommendations.pdf');
  };

  return {
    chatInput, setChatInput,
    chatHistory, setChatHistory,
    isLoading, language, setLanguage,
    reorderMap, supplements, setSupplements,
    handleChatSubmit,
    exportToPDF
  };
}
