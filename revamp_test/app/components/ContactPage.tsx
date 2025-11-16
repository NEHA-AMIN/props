'use client'; 
 
import React, { useEffect, useState } from 'react'; 
import { motion } from 'framer-motion'; 
import { Vortex } from "@/components/ui/shadcn-io/vortex";
import { submitContactToHubspot } from '@/app/actions/hubspot';
import SignalSection from './SignalSection';
import { GradientButton } from '@/components/ui/gradient-button';
 
const LOCATIONS = [
  {
    flag: '🇺🇸',
    country: 'United States',
    isHQ: true,
    lines: [
      '303 Twin Dolphin Drive Suite 600,',
      'Redwood City, CA - 94065',
    ],
  },
  {
    flag: '🇸🇬',
    country: 'Singapore',
    isHQ: false,
    lines: [
      '6 Battery Road,',
      'Singapore - 049909',
    ],
  },
  {
    flag: '🇮🇳',
    country: 'India',
    isHQ: false,
    lines: [
      'NR Trident Tech Park, Sector 6,',
      'HSR Layout, Bangalore - 560068',
    ],
  },
];
 
export default function ContactPage() { 
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '', wantsDemo: 'Yes' }); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle'); 
  const [errorMessage, setErrorMessage] = useState<string>('');
 
  // Auto-scroll to the contact form on page load
  useEffect(() => {
    const el = document.getElementById('contact-form');
    if (el) {
      // Delay slightly to ensure layout is ready
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  }; 
 
  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Create FormData object for HubSpot
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('email', formData.email);
      formDataObj.append('company', formData.company);
      formDataObj.append('message', formData.message);
      formDataObj.append('wantsDemo', formData.wantsDemo || 'No');
      formDataObj.append('pageUri', window.location.href);
      
      // Get HubSpot tracking cookie if available
      const hutk = document.cookie
        .split('; ')
        .find(row => row.startsWith('hubspotutk='))
        ?.split('=')[1];
      
      if (hutk) {
        formDataObj.append('hutk', hutk);
      }
      
      // Submit to HubSpot
      const result = await submitContactToHubspot(formDataObj);
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', message: '', wantsDemo: 'Yes' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to submit form. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }; 
 
  return (
    <main className="min-h-screen text-white overflow-hidden">
      {/* Full-page Vortex background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Vortex
          backgroundColor="black"
          particleCount={1200}
          baseHue={160}
          rangeHue={40}
          baseSpeed={0.05}
          rangeSpeed={1.2}
          containerClassName="w-full h-full"
        />
      </div>
      
      {/* SECTION 1: HERO SECTION */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* Content container with proper centering */}
        <div className="relative z-20 flex min-h-screen w-full flex-col items-center justify-center px-6">
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }} 
              className="text-center"
            >
              <motion.h1 
                className="font-bold mb-6 tracking-tight leading-[0.9]"
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white">
                  Let's
                </span>
                <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl bg-gradient-to-r from-teal-400 via-teal-300 to-teal-500 bg-clip-text text-transparent animate-pulse">
                  Connect
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light mb-10" 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.4 }} 
              > 
                Have questions? Want to see a demo? We're here to help you unlock the power of location intelligence. 
              </motion.p>
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <GradientButton
                  onClick={() => {
                    const el = document.getElementById('contact-form');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  variant="variant"
                >
                  Book a Demo
                </GradientButton>
              </motion.div>
              
              {/* Scroll indicator */}
              <motion.div 
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <span className="text-sm text-slate-400 mb-2">Scroll Down</span>
                <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center p-1">
                  <motion.div 
                    className="w-1 h-2 bg-teal-400 rounded-full"
                    animate={{ 
                      y: [0, 12, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
 
      {/* Combined Contact Form and Cards Section */}
      <section className="relative z-10 min-h-screen py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Send Us a Message</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Fill out the form below and we'll get back to you within 24 hours</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Form background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-blue-500/5 to-purple-500/10 rounded-3xl blur-xl" />

              <form
                id="contact-form"
                onSubmit={handleSubmit}
                className="relative bg-[#050A14]/80 backdrop-blur-xl border border-slate-800/40 rounded-3xl p-8 md:p-10 shadow-2xl h-full"
              >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"> 
              <div className="space-y-2"> 
      <label htmlFor="name" className="block text-sm font-semibold text-slate-300">Full Name <span className="text-teal-500">*</span></label>
                <div className="relative"> 
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="w-full px-5 py-4 bg-[#070C18]/70 border border-slate-700/40 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300"
                    placeholder="John Doe" 
                  /> 
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" /> 
                </div> 
              </div> 

              <div className="space-y-2"> 
      <label htmlFor="email" className="block text-sm font-semibold text-slate-300">Email Address <span className="text-teal-500">*</span></label>
                <div className="relative"> 
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className="w-full px-5 py-4 bg-[#070C18]/70 border border-slate-700/40 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300"
                    placeholder="john@company.com" 
                  /> 
                </div> 
              </div> 
            </div> 

            <div className="space-y-2 mb-8"> 
      <label htmlFor="company" className="block text-sm font-semibold text-slate-300">Company</label>
              <div className="relative"> 
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  value={formData.company} 
                  onChange={handleChange} 
                  className="w-full px-5 py-4 bg-[#070C18]/70 border border-slate-700/40 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300"
                  placeholder="Your Company Name" 
                /> 
              </div> 
            </div> 

            {/* Book a Demo? (Yes/No) */}
            <div className="space-y-2 mb-6">
              <span className="block text-sm font-semibold text-slate-300">Would you like to book a demo?</span>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-slate-300">
                  <input
                    type="radio"
                    name="wantsDemo"
                    value="Yes"
                    checked={formData.wantsDemo === 'Yes'}
                    onChange={handleChange}
                    className="h-4 w-4 accent-teal-500"
                  />
                  Yes
                </label>
                <label className="flex items-center gap-2 text-slate-300">
                  <input
                    type="radio"
                    name="wantsDemo"
                    value="No"
                    checked={formData.wantsDemo === 'No'}
                    onChange={handleChange}
                    className="h-4 w-4 accent-teal-500"
                  />
                  No
                </label>
              </div>
            </div>

            <div className="space-y-2 mb-10"> 
      <label htmlFor="message" className="block text-sm font-semibold text-slate-300">Message <span className="text-teal-500">*</span></label>
              <div className="relative"> 
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  rows={6} 
                  className="w-full px-5 py-4 bg-[#070C18]/70 border border-slate-700/40 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20 transition-all duration-300 resize-none"
                  placeholder="Tell us about your needs..." 
                /> 
              </div> 
            </div> 

            <motion.div
              whileHover={{ scale: isSubmitting ? 1 : 1.03 }} 
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            > 
              <GradientButton 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : submitStatus === 'success' 
                    ? 'bg-green-500' 
                    : submitStatus === 'error'
                    ? 'bg-red-500'
                    : ''
                }`}
                variant="variant"
              > 
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </span>
                ) : submitStatus === 'success' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Message Sent!
                  </span>
                ) : submitStatus === 'error' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Failed - Try Again
                  </span>
                ) : (
                  <span className="relative z-10">Send Message</span>
                )}
              </GradientButton>
            </motion.div>
            
            {/* Error message display */}
            {errorMessage && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400 text-center mt-4"
              >
                {errorMessage}
              </motion.p>
            )}
            
            {/* Privacy note */}
            <p className="text-xs text-slate-500 text-center mt-6">
              By submitting this form, you agree to our <a href="#" className="text-teal-400 hover:text-teal-300 transition-colors">Privacy Policy</a> and consent to being contacted regarding your inquiry.
            </p>
          </form>
        </motion.div>

        {/* Right Column: Single Locations Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-full"
        >
          <div className="relative bg-[#050A14]/80 backdrop-blur-xl border border-slate-800/40 rounded-3xl p-8 h-full shadow-2xl">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white">Corporate Addresses</h3>
            </div>

            <div className="space-y-8">
              {LOCATIONS.map((loc) => (
                <div key={loc.country} className="flex items-start gap-5">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-teal-500/15 flex items-center justify-center text-lg md:text-xl">
                    <span className="leading-none">{loc.flag}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="text-lg font-semibold text-white">{loc.country}</p>
                      {loc.isHQ && (
                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                          Headquarters
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-slate-300 text-sm leading-relaxed">
                      {loc.lines[0]}<br />{loc.lines[1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>

      {/* Newsletter (replaces location section) */}
      <SignalSection />
    </main>
  );
}
