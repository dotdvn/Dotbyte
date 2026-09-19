
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LiveNotificationPill() {
  const [statusIdx, setStatusIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  const statuses = [
    'PCB circuit layout parsed with zero DRC errors.',
    'ESP32 IoT sensor node synchronized successfully.',
    'Premium web platform responsive viewport verified.',
    'Gerber manufacturing parameters compiled successfully.',
    'Affordable advanced app binary loaded and validated.',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % statuses.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 max-w-[340px] px-4 py-2.5 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(167,139,113,0.15)] flex items-center justify-between gap-3 pointer-events-auto select-none"
          id="live_notification_pill"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse relative flex items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            </span>
            <span className="font-sans font-bold text-[8px] text-green-400 tracking-widest uppercase">
              LIVE
            </span>
          </div>

          <div className="h-4 w-[1px] bg-white/10" />

          <div className="flex-1 min-w-0 pr-1">
            <AnimatePresence mode="wait">
              <motion.p
                key={statusIdx}
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.3 }}
                className="font-sans text-[11px] text-gray-200 truncate leading-none text-left tracking-wide"
              >
                {statuses[statusIdx]}
              </motion.p>
            </AnimatePresence>
          </div>

          <button
            onClick={() => setVisible(false)}
            className="p-1 text-gray-600 hover:text-white transition-colors text-[10px]"
            title="Dismiss"
            id="dismiss_notification_button"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
