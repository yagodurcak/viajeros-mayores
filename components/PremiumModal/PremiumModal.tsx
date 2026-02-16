'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Plane,
  Briefcase,
  Shield,
  Bell,
  Wrench,
  Sparkles,
  Check,
  Clock,
  ArrowLeft,
  Mail,
} from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  intendedPath?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PremiumModal = ({
  isOpen,
  onClose,
  intendedPath = '/search',
}: PremiumModalProps) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const benefits = [
    { icon: Briefcase, text: 'Beneficios y descuentos' },
    { icon: Plane, text: 'Asistencias en viajes' },
    { icon: Shield, text: 'Derechos poco conocidos' },
    { icon: Bell, text: 'Alertas y noticias importantes' },
    { icon: Wrench, text: 'Herramientas para utilizar en tu viaje' },
  ];

  const handleClose = () => {
    setStep(1);
    setEmail('');
    setError(null);
    onClose();
  };

  const handleContinue = () => {
    setError(null);
    setStep(2);
  };

  const handleBack = () => {
    setError(null);
    setStep(1);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim();
    if (!trimmed) {
      setError('Ingresá tu email');
      return;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setError('Email inválido');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/premium/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          intendedPath,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Error al crear el pago');
        setLoading(false);
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError('No se recibió el link de pago');
    } catch {
      setError('Error de conexión. Intentá de nuevo.');
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          key="premium-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 opacity-10" />

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-md"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="relative p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-medium shadow-lg"
                    >
                      <Sparkles className="w-4 h-4" />
                      Contenido Premium
                    </motion.div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                      Lo que aprendes acá puede pagarse solo en tu próximo vuelo.
                    </h2>

                    <p className="text-gray-600 mb-6">
                      Accede a todos los contenidos premium, conocimientos y
                      herramientas que te ahorrarán dinero y tiempo en cada
                      viaje.
                    </p>

                    <div className="space-y-3 mb-8">
                      {benefits.map((benefit, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index + 0.3 }}
                          className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-gray-100"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-md">
                            <benefit.icon className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-gray-700 font-medium">
                            {benefit.text}
                          </span>
                          <Check className="ml-auto w-5 h-5 text-green-500" />
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 mb-6 border-2 border-orange-200 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 opacity-5">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage:
                              'radial-gradient(circle, #000 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                          }}
                        />
                      </div>
                      <div className="relative">
                        <div className="flex items-center justify-center gap-1.5 mb-3">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold shadow-md animate-pulse">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Oferta válida hasta el 1 de marzo</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="text-2xl font-semibold text-gray-400 line-through">
                            USD 45
                          </span>
                          <div className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                            -58%
                          </div>
                        </div>
                        <div className="flex items-baseline justify-center gap-2 mb-2">
                          <span className="text-5xl font-bold text-gray-900">
                            USD 0,10
                          </span>
                          <span className="text-sm text-amber-600 font-medium">
                            (prueba)
                          </span>
                          <span className="text-gray-600 font-medium">
                            una sola vez
                          </span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-orange-600 font-semibold">
                          <Sparkles className="w-4 h-4" />
                          <span>Acceso limitado de por vida</span>
                          <Sparkles className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.div>

                    <motion.button
                      type="button"
                      onClick={handleContinue}
                      className="block w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 text-lg text-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Continuar
                    </motion.button>

                    <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
                      <Shield className="w-4 h-4" />
                      Pago seguro con PayPal. No guardamos datos de tu tarjeta.
                    </p>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm transition-colors -ml-0.5"
                      aria-label="Volver"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Volver
                    </button>

                    <div>
                      <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-1.5">
                        ¿A qué email te lo activamos?
                      </h2>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Después del pago te enviamos un link para crear tu
                        contraseña y entrar.
                      </p>
                    </div>

                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <div>
                        <label
                          htmlFor="premium-email"
                          className="sr-only"
                        >
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                          <input
                            id="premium-email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setError(null);
                            }}
                            placeholder="tu@email.com"
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#E36E4A] focus:ring-2 focus:ring-[#E36E4A]/20 outline-none transition text-base"
                            autoComplete="email"
                            disabled={loading}
                          />
                        </div>
                        {error && (
                          <p className="mt-2 text-sm text-red-600">{error}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-4 bg-[#E36E4A] hover:bg-[#D45A36] disabled:opacity-70 text-white font-semibold rounded-xl transition-colors text-base"
                      >
                        {loading ? 'Preparando...' : 'Ir a pagar'}
                      </button>
                    </form>

                    <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" />
                      Pago seguro con PayPal
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
