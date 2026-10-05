import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Clock, MapPin } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { updateSEO } from '../utils/seo';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'product-recommendation',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    updateSEO({
      title: 'Contact Editorial Desk | BuyWise',
      description: 'Get in touch with the BuyWise editorial team for product questions, corrections, guide suggestions, and partnership inquiries.',
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    setStatus('submitting');

    // Simulate backend submission
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: 'product-recommendation',
        message: '',
      });
    }, 800);
  };

  const breadcrumbs = [
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <Breadcrumbs items={breadcrumbs} />

      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Contact Our Editorial Desk
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          Have a product you want us to research? Spotted a specification error? Or just need buying advice between two laptop models? Send us a note.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form */}
        <div className="md:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
          {status === 'success' ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out. Our editorial team reviews reader inquiries daily and will respond within 24-48 business hours.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 text-xs font-bold text-orange-600 hover:text-orange-700 underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. rahul@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Subject / Topic
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-orange-500 focus:bg-white cursor-pointer"
                >
                  <option value="product-recommendation">Product Recommendation Request</option>
                  <option value="correction">Report a Spec Error or Outdated Price</option>
                  <option value="editorial">Editorial Feedback & Inquiries</option>
                  <option value="partnership">Business & Affiliate Inquiries</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what product you're considering or how we can help..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
                  required
                />
              </div>

              {status === 'error' && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-orange-500/20 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{status === 'submitting' ? 'Sending Message...' : 'Submit Message'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-slate-50 rounded-3xl border border-slate-200/90 p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Direct Editorial Channels</h3>
            
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">General Inquiries:</span>
                  <span className="text-slate-600">contact@buywise-reviews.org</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">Response Time:</span>
                  <span className="text-slate-600">Typically 24-48 business hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-800 block">Product Corrections:</span>
                  <span className="text-slate-600">editorial@buywise-reviews.org</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50/80 rounded-3xl border border-orange-200/80 p-6 text-xs text-orange-950 leading-relaxed">
            <h4 className="font-bold text-orange-900 text-sm mb-1">Affiliate Integrity Policy</h4>
            <p>
              Please note: we do not accept payment to review or favorably rank products. Unsolicited requests for paid positive reviews will be politely declined.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
