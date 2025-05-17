// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainDashboard from './pages/MainDashboard';
import SmartStartSummary from './pages/SmartStartSummary';
import BadgeHistoryPage from './pages/BadgeHistoryPage';
import NotificationSettings from './pages/NotificationSettings';
import ChatPage from './pages/ChatPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="/smart-start" element={<SmartStartSummary />} />
        <Route path="/badge-history" element={<BadgeHistoryPage />} />
        <Route path="/settings" element={<NotificationSettings />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<p className="p-6">404 – Page not found</p>} />
      </Routes>
    </BrowserRouter>
  );
}
