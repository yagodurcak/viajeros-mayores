'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
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
} from 'lucide-react';

const STORAGE_KEY = 'premium_modal_dismissed';

const PAYPAL_CHECKOUT_URL = 'https://www.paypal.com/ncp/payment/XK86A59T5DCYC';

export function PremiumModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) return;

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setIsOpen(true);
    };

    // Trigger after 30 seconds
    const timer = setTimeout(trigger, 30000);

    // Trigger when user scrolls 40% of the page
    const onScroll = () => {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled >= 0.4) trigger();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);


  const onClose = () => {
    setIsOpen(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, 'true');
    }
  };

  if (!isOpen) return null;

  const benefits = [
    { icon: Bell, text: 'Descuentos en pasajes' },
    { icon: Briefcase, text: 'Datos de contacto de cada aerolinea' },
    { icon: Plane, text: 'Asistencia en aeropuerto' },
    { icon: Shield, text: 'Derechos poco conocidos' },
    {
      icon: Wrench,
      text: 'Checklist completo para repasar antes de viajar',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors shadow-md"
          aria-label="Cerrar modal"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Pink Header Section */}
        <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 px-6 pt-6 pb-4">
          {/* Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-medium shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Oferta Exclusiva
          </motion.div>

          {/* Title */}
          <h2 className="text-[2rem] font-bold text-gray-900 mb-1.5">
            Guia Premium Beneficios Aerolineas 2026
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-sm">
            Guia de cómo solicitarlo paso a paso en{' '}
            <span className="font-bold uppercase">cada aerolínea</span>. Te
            ahorraras dinero, comodidad y tiempo en cada viaje.
          </p>
        </div>

        {/* Rest of Content */}
        <div className="relative p-6 pt-4">
          {/* Benefits List */}
          <div className="space-y-2 mb-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index + 0.3 }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-gray-100"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-md">
                  <benefit.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 text-sm font-medium">{benefit.text}</span>
                <Check className="ml-auto w-4 h-4 text-green-500 flex-shrink-0" />
              </motion.div>
            ))}
          </div>

          {/* Airlines Coverage Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-4 text-center"
          >
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Cubre estas aerolíneas
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {[
                'Copa Airlines',
                'LATAM',
                'Avianca',
                'Aeromexico',
                'Aerolineas Argentinas',
                'Iberia',
              ].map((airline, index) => (
                <motion.span
                  key={airline}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-xs font-bold uppercase transition-colors"
                >
                  {airline}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Pricing Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 mb-4 border-2 border-orange-200 relative overflow-hidden"
          >
            <div className="relative">
              {/* Countdown Badge */}
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold shadow-md animate-pulse">
                  <Clock className="w-3 h-3" />
                  <span>Oferta válida hasta el 15 de marzo</span>
                </div>
              </div>

              {/* Original Price + Current Price inline */}
              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-semibold text-gray-400 line-through">
                    USD 25
                  </span>
                  <div className="px-1.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                    -36%
                  </div>
                </div>
                <span className="text-5xl font-bold text-gray-900">USD 9</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-orange-600 font-semibold text-sm mt-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Guia descargable de bolsillo</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.a
            href={PAYPAL_CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="block w-full py-3.5 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 text-base text-center"
          >
            Quiero la guia!
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
