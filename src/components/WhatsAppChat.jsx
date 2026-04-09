import React, { useState, useEffect } from 'react';
import { Whatsapp } from 'lucide-react';

// Lightweight WhatsApp chat float.
// Props:
//  - phone: string in international format, e.g. '15551234567' (digits only, include country code)
//  - initialMessage: default text for the chat message
//  - position: optional, kept for future customization
export default function WhatsAppChat({ phone, initialMessage = 'Hello, I would like to chat!' }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(initialMessage);

  // Normalize phone to digits only
  const cleanPhone = (phone || '').replace(/\D/g, '');
  const waLink = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
    : '#';

  // Optional: close on Escape when panel is open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Styles: relies on Tailwind in project
  return (
    <>
      <div className="fixed right-6 bottom-6 z-50">
        <button
          aria-label="Open WhatsApp chat"
          onClick={() => setOpen((v) => !v)}
          className="bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center focus:outline-none"
        >
          <span className="sr-only">WhatsApp</span>
          <Whatsapp className="w-5 h-5" />
        </button>

        {open && (
          <div className="mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-3">
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
          </div>
        )}
      </div>
    </>
  );
}
