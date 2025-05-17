// ChatBox.jsx – VITA AI Symptom Chat
import React, { useState } from 'react';

export default function ChatBox({ chatHistory, chatInput, isLoading, onInputChange, onSubmit, autoScroll }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow h-[400px] flex flex-col">
      <h2 className="text-lg font-semibold text-brand mb-2">💬 Ask VITA Anything</h2>

      <div ref={containerRef} className="flex-1 overflow-y-auto space-y-2 text-sm mb-4">
        {chatHistory.map((msg, i) => (
          <div key={i} className={`p-2 rounded ${msg.type === 'user' ? 'bg-blue-50 text-right' : 'bg-gray-50 text-left'}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {isLoading && <div className="text-gray-400 text-xs">VITA is thinking…</div>}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="flex gap-2">
        <input
          type="text"
          value={chatInput}
          onChange={onInputChange}
          placeholder="Enter symptoms like bloat, fatigue…"
          className="flex-1 p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-brand"
        />
        <button type="submit" className="bg-brand text-white px-4 py-2 rounded text-sm">Send</button>
      </form>
    </div>
  );
}
