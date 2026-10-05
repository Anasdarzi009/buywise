import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  X, 
  Mail, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

/**
 * ExitIntentPopup Component
 * Professional exit-intent and engagement subscription modal.
 * Supports Email & WhatsApp deal alerts with client-side validation,
 * privacy compliance, and modular backend API integration readiness.
 */
export default function ExitIntentPopup({ isOpen, onClose, onSubscribed }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [receiveEmail, setReceiveEmail] = useState(true);
  const [receiveWhatsapp, setReceiveWhatsapp] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setErrors({});
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose('escape');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Clean validation logic
  const validateForm = () => {
    const newErrors = {};

    if (!receiveEmail && !receiveWhatsapp) {
      newErrors.channels = 'Please select at least one method to receive deals (Email or WhatsApp).';
    }

    if (receiveEmail) {
      const emailTrimmed = email.trim();
      if (!emailTrimmed) {
        newErrors.email = 'Please enter your email address.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
        newErrors.email = 'Please enter a valid email address (e.g. you@example.com).';
      }
    }

    if (receiveWhatsapp) {
      const phoneClean = phone.replace(/[\s\-\(\)]/g, '');
      if (!phoneClean) {
        newErrors.phone = 'Please enter your WhatsApp phone number.';
      } else if (!/^\+?[0-9]{10,14}$/.test(phoneClean)) {
        newErrors.phone = 'Please enter a valid phone number with country code (e.g. +91 98765 43210).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Modular subscriber payload ready for ESP / WhatsApp Business API integration
    const subscriberPayload = {
      email: receiveEmail ? email.trim() : null,
      phone: receiveWhatsapp ? phone.trim() : null,
      preferences: {
        email: receiveEmail,
        whatsapp: receiveWhatsapp,
      },
      source: 'exit_intent_popup',
    };

    // Simulated async subscription flow
    // In production, connect this to your newsletter endpoint (e.g. Mailchimp, ConvertKit, Gupshup, Twilio)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onSubscribed) {
        onSubscribed(subscriberPayload);
      }
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onClose('backdrop')}
            className="fixed inset-0 bg-slate-950/65 backdrop-blur-xs cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[440px] sm:max-w-[460px] bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 z-10 my-auto text-left"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Top Close Button */}
            <button
              onClick={() => onClose('close_button')}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close deals popup"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess ? (
              /* SUCCESS STATE */
              <div className="py-4 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-1.5">
                  <h3 id="modal-title" className="text-2xl font-black text-slate-900 tracking-tight">
                    You're in!
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                    Thanks for subscribing. We'll send you our best deals and recommendations.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 text-xs text-slate-600 space-y-1 text-left">
                  <div className="font-semibold text-slate-800">Your Subscription Preferences:</div>
                  {receiveEmail && (
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Email Alerts ({email})</span>
                    </div>
                  )}
                  {receiveWhatsapp && (
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>WhatsApp Alerts ({phone})</span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => onClose('success_done')}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3 px-5 rounded-xl transition-all cursor-pointer shadow-sm"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            ) : (
              /* SUBSCRIPTION FORM */
              <div>
                {/* Header Icon & Title */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100/90 text-orange-600 flex items-center justify-center mb-3.5 shadow-sm border border-orange-200/60">
                    <Bell className="w-6 h-6 text-orange-600 fill-orange-600/20" />
                  </div>

                  <h2 id="modal-title" className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight leading-tight">
                    Don't leave without the best deals!
                  </h2>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Get notified of our best promotions directly on your email or WhatsApp.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  {/* Channel Selection Error */}
                  {errors.channels && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200/80 rounded-xl flex items-center gap-2 text-xs text-rose-700">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errors.channels}</span>
                    </div>
                  )}

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                        }}
                        placeholder="you@example.com"
                        className={`w-full bg-slate-50 border ${
                          errors.email ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-orange-500'
                        } rounded-xl pl-10 pr-4 py-2.5 sm:py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all`}
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* WhatsApp / Phone Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      WhatsApp / Phone
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: null }));
                        }}
                        placeholder="+91 XXXXX XXXXX"
                        className={`w-full bg-slate-50 border ${
                          errors.phone ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-orange-500'
                        } rounded-xl pl-10 pr-4 py-2.5 sm:py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-all`}
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* Channel Checkboxes */}
                  <div className="space-y-2 pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-slate-700 select-none">
                      <input
                        type="checkbox"
                        checked={receiveEmail}
                        onChange={(e) => {
                          setReceiveEmail(e.target.checked);
                          if (errors.channels) setErrors((prev) => ({ ...prev, channels: null }));
                        }}
                        className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300 cursor-pointer accent-orange-600"
                      />
                      <span className="font-medium">Receive deals via Email</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-slate-700 select-none">
                      <input
                        type="checkbox"
                        checked={receiveWhatsapp}
                        onChange={(e) => {
                          setReceiveWhatsapp(e.target.checked);
                          if (errors.channels) setErrors((prev) => ({ ...prev, channels: null }));
                        }}
                        className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-slate-300 cursor-pointer accent-orange-600"
                      />
                      <span className="font-medium">Receive deals via WhatsApp</span>
                    </label>
                  </div>

                  {/* Primary & Secondary Buttons */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-sm sm:text-base py-3 px-5 rounded-xl transition-all shadow-md hover:shadow-orange-500/25 disabled:opacity-50 cursor-pointer"
                    >
                      <span>{isSubmitting ? 'Subscribing...' : 'Subscribe'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onClose('no_thanks')}
                      className="w-full text-center text-xs sm:text-sm font-semibold text-slate-500 hover:text-slate-800 py-1.5 transition-colors cursor-pointer"
                    >
                      No, thanks
                    </button>
                  </div>

                  {/* Privacy / Consent Notice */}
                  <div className="pt-2 border-t border-slate-100 text-center">
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      By subscribing, you agree to receive deal alerts and recommendations. You can unsubscribe at any time.{' '}
                      <Link
                        to="/privacy-policy"
                        onClick={() => onClose('privacy_link')}
                        className="underline hover:text-slate-600 font-medium"
                      >
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
