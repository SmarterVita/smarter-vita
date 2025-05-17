// VoiceInput.jsx
import React from 'react';

export default function VoiceInput({ onResult }) {
  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported');
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
    recognition.start();
  };

  return (
    <button
      type="button"
      onClick={startVoiceInput}
      className="mt-2 text-[#7DCFB6] hover:text-[#65b8a0]"
    >
      🎙️ Voice Input
    </button>
  );
}
