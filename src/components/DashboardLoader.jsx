import React from 'react';
import { motion } from 'framer-motion';

export default function DashboardLoader() {
  return (
    <div className="p-xl max-w-5xl mx-auto text-center space-y-md">
      <motion.div
        className="flex justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, loop: Infinity }}
      >
        <div className="w-20 h-20 rounded-lg bg-gradient-to-tr from-brand to-white shadow-brand-md flex items-center justify-center">
          <span className="text-white text-2xl font-bold">V</span>
        </div>
      </motion.div>
      <p className="text-sm text-gray-500">🧠 VITA is optimizing your dashboard…</p>
      <p className="text-sm text-brand italic">“The smarter you move, the brighter you glow.”</p>
      <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4" />
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-40 bg-gray-100 rounded-lg" />
        <div className="h-40 bg-gray-100 rounded-lg" />
      </div>
      <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto mt-4" />
      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <div className="h-20 bg-gray-100 rounded-lg" />
        <div className="h-20 bg-gray-100 rounded-lg" />
        <div className="h-20 bg-gray-100 rounded-lg" />
        <div className="h-20 bg-gray-100 rounded-lg" />
      </div>
    </div>
  );
}
