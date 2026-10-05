import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    // Simulated modular subscribe handler
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setErrorMessage('');
    }, 700);
  };

  return (
    <section className="my-14 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 mb-4 border border-orange-500/30">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Get Better Buying Recommendations
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          Join over 15,000 smart shoppers. Get our weekly roundup of the genuinely best tech deals, price drops, and unbiased buying guides delivered straight to your inbox.
        </p>

        {status === 'success' ? (
          <div className="mt-6 p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl flex items-center justify-center gap-3 text-emerald-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-sm font-medium">Thank you for subscribing! Check your inbox for our latest top picks.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your email address..."
                  className="w-full bg-slate-800/80 border border-slate-700 focus:border-orange-500 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none transition-all"
                  disabled={status === 'loading'}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md hover:shadow-orange-500/20 disabled:opacity-50 shrink-0 cursor-pointer"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
              </button>
            </div>

            {status === 'error' && (
              <div className="mt-2.5 flex items-center justify-center gap-1.5 text-xs text-rose-400">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <p className="text-[11px] text-slate-400 mt-3">
              Zero spam. Unsubscribe with one click anytime. Read our{' '}
              <a href="/privacy-policy" className="underline hover:text-slate-200">
                Privacy Policy
              </a>.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
