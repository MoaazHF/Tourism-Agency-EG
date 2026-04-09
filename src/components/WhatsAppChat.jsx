import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// WhatsApp chat as a floating widget using a local public image (whatsapp.png)
export default function WhatsAppChat({ phone, initialMessage = 'Hello, I would like to chat!' }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  const cleanPhone = (phone || '').replace(/\D/g, '');
  const waLink = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}` : '#';

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <div className="fixed right-6 bottom-6 z-50">
        <button
          aria-label="Open WhatsApp chat"
          onClick={() => setOpen((v) => !v)}
          className="bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center focus:outline-none"
        >
          <span className="sr-only">WhatsApp</span>
          <img src="/whatsapp.png" alt="WhatsApp" className="w-6 h-6" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              key="panel"
              initial={{ scale: 0.92, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 8 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-3"
            >
              <div className="flex items-center justify-between mb-2">
                <strong>WhatsApp</strong>
                <button aria-label="Close" onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">×</button>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-20 resize-none border rounded-md p-2 mb-2"
              />
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer noopener"
                className={`block w-full text-center rounded-md px-3 py-2 font-bold ${cleanPhone ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-300 text-gray-700 cursor-not-allowed'}`}
              >
                Open WhatsApp
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
