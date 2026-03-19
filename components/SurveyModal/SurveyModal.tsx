'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle } from 'lucide-react';

const STORAGE_KEY = 'survey_shown';
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

const OPTIONS = [
  { value: 'offers', label: '✈️  Ofertas de viajes', description: 'Descuentos y paquetes turísticos' },
  { value: 'tips', label: '🧳  Consejos de viaje', description: 'Salud, seguridad y equipaje para el camino' },
  { value: 'destinations', label: '🗺️  Destinos recomendados', description: 'Lugares accesibles y amigables para mayores' },
  { value: 'community', label: '💬  Experiencias de la comunidad', description: 'Historias reales de otros viajeros' },
  { value: 'other', label: '✏️  Otra idea...', description: 'Cuéntanos con tus palabras' },
] as const;

type OptionValue = (typeof OPTIONS)[number]['value'];

function wasShownRecently(): boolean {
  if (typeof window === 'undefined') return false;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  const ts = parseInt(raw, 10);
  return !isNaN(ts) && Date.now() - ts < THIRTY_DAYS_MS;
}

export function SurveyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<OptionValue | null>(null);
  const [otherText, setOtherText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const openModal = useCallback(() => {
    if (wasShownRecently()) return;
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (wasShownRecently()) return;

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      openModal();
    };

    // Trigger after 30 seconds
    const timer = setTimeout(trigger, 30_000);

    // Exit intent: cursor leaves viewport from the top
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [openModal]);

  // Auto-close 3s after success
  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setIsOpen(false), 3000);
    return () => clearTimeout(t);
  }, [success]);

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit = async () => {
    if (!selected) return;
    if (selected === 'other' && !otherText.trim()) return;

    setSubmitting(true);
    try {
      await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          option: selected,
          other_text: otherText.trim() || undefined,
          page_url: window.location.href,
        }),
      });
      setSuccess(true);
    } catch {
      // Fail silently — don't disrupt UX
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="survey-title"
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ type: 'spring', duration: 0.45 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-gray-100 transition-colors shadow"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            {success ? (
              /* ── Success state ── */
              <div className="flex flex-col items-center justify-center py-12 px-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                >
                  <CheckCircle className="w-16 h-16 text-[#E36E4A] mx-auto mb-4" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 font-alata">
                  ¡Gracias por tu opinión!
                </h2>
                <p className="text-gray-600 text-base">
                  Tu respuesta nos ayuda a mejorar el contenido para ti y toda la comunidad.
                </p>
              </div>
            ) : (
              /* ── Survey form ── */
              <>
                {/* Header */}
                <div className="bg-gradient-to-br from-[#E36E4A] via-[#D45A36] to-[#B8421E] px-6 pt-6 pb-5">
                  <p className="text-orange-100 text-sm font-medium mb-1">Tu opinión importa</p>
                  <h2
                    id="survey-title"
                    className="text-white text-xl font-bold font-alata leading-snug"
                  >
                    ¿Qué te gustaría que Viajeros Mayores te brinde más?
                  </h2>
                </div>

                {/* Options */}
                <div className="px-5 pt-4 pb-2 space-y-2">
                  {OPTIONS.map((opt) => {
                    const isSelected = selected === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setSelected(opt.value)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all min-h-[52px] ${
                          isSelected
                            ? 'border-[#E36E4A] bg-orange-50'
                            : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/40'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isSelected ? 'border-[#E36E4A] bg-[#E36E4A]' : 'border-gray-300'
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-gray-900 font-semibold text-base leading-tight">
                            {opt.label}
                          </p>
                          <p className="text-gray-500 text-sm mt-0.5">{opt.description}</p>
                        </div>
                      </button>
                    );
                  })}

                  {/* Free text when "other" is selected */}
                  <AnimatePresence>
                    {selected === 'other' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <textarea
                          value={otherText}
                          onChange={(e) => setOtherText(e.target.value)}
                          placeholder="Cuéntanos tu idea..."
                          rows={3}
                          maxLength={500}
                          className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-orange-300 focus:border-[#E36E4A] focus:ring-2 focus:ring-[#E36E4A]/20 outline-none resize-none text-base text-gray-900 placeholder:text-gray-400 transition-colors"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Actions */}
                <div className="px-5 pb-5 pt-3 flex flex-col gap-2">
                  <button
                    onClick={onSubmit}
                    disabled={
                      !selected ||
                      (selected === 'other' && !otherText.trim()) ||
                      submitting
                    }
                    className="w-full min-h-[48px] py-3 px-6 bg-gradient-to-r from-[#E36E4A] to-[#B8421E] hover:from-[#D45A36] hover:to-[#B8421E] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-md transition-all text-base"
                  >
                    {submitting ? 'Enviando...' : 'Enviar respuesta'}
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full min-h-[44px] py-2 text-gray-500 hover:text-gray-700 text-base transition-colors"
                  >
                    Ahora no
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
