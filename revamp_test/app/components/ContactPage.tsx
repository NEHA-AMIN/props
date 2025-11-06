'use client'; 
 
import React, { useState } from 'react'; 
import { motion } from 'framer-motion'; 
import { Vortex } from "@/components/ui/shadcn-io/vortex";
 
const CONTACT_INFO = [ 
  { 
    icon: '📧', 
    title: 'Email Us', 
    details: 'hello@propheus.com', 
    link: 'mailto:hello@propheus.com', 
    description: 'Get in touch via email' 
  }, 
  { 
    icon: '📞', 
    title: 'Call Us', 
    details: '+1 (555) 123-4567', 
    link: 'tel:+15551234567', 
    description: 'Speak with our team' 
  }, 
  { 
    icon: '📍', 
    title: 'Visit Us', 
    details: '123 Innovation Drive, San Francisco, CA 94105', 
    link: 'https://maps.google.com', 
    description: 'Come see us in person' 
  }, 
  { 
    icon: '💬', 
    title: 'Live Chat', 
    details: 'Available Mon-Fri, 9AM-6PM PST', 
    link: '#', 
    description: 'Instant support' 
  } 
]; 
 
export default function ContactPage() { 
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' }); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle'); 
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  }; 
 
  const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    setIsSubmitting(true); 
    setTimeout(() => { 
      setIsSubmitting(false); 
      setSubmitStatus('success'); 
      setFormData({ name: '', email: '', company: '', message: '' }); 
      setTimeout(() => setSubmitStatus('idle'), 3000); 
    }, 1500); 
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
                <button className="px-8 py-4 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full text-white font-medium text-lg hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300">
                  Get Started
                </button>
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

            <div className="relative"> 
              {/* Button glow effect */} 
              <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-all duration-300" /> 

              <motion.button 
                type="submit" 
                disabled={isSubmitting} 
                whileHover={{ scale: isSubmitting ? 1 : 1.03 }} 
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }} 
                className={`relative w-full py-4 rounded-full font-bold text-lg transition-all duration-300 overflow-hidden ${
                  isSubmitting 
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                    : submitStatus === 'success' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-lg hover:shadow-teal-500/50'
                }`}
              > 
                {/* Animated background for button */} 
                {!isSubmitting && submitStatus !== 'success' && (
                  <div className="absolute inset-0 w-full h-full">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_107%,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.1)_15%,transparent_30%)]"></div>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 blur-xl rounded-full transform translate-x-10 -translate-y-5"></div>
                  </div>
                )}
                
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
                ) : (
                  <span className="relative z-10">Send Message</span>
                )}
              </motion.button>
            </div>
            
            {/* Privacy note */}
            <p className="text-xs text-slate-500 text-center mt-6">
              By submitting this form, you agree to our <a href="#" className="text-teal-400 hover:text-teal-300 transition-colors">Privacy Policy</a> and consent to being contacted regarding your inquiry.
            </p>
          </form>
        </motion.div>

        {/* Right Column: Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-rows-4 gap-4 h-full"
        >
          {CONTACT_INFO.map((info, index) => (
            <motion.a
              key={info.title}
              href={info.link}
              target={info.link?.startsWith('http') ? '_blank' : undefined}
              rel={info.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="group relative overflow-hidden h-full"
            >
              {/* Using the same abyss tone as the form */}
              <div className="relative bg-[#050A14]/80 backdrop-blur-xl border border-slate-800/40 rounded-3xl p-6 h-full shadow-2xl transition-all duration-300 flex flex-col justify-center">
                <div className="flex items-center">
                  {/* Icon */}
                  <div className="relative mr-4 w-10 h-10 flex items-center justify-center">
                    <div className="text-2xl">{info.icon}</div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{info.title}</h3>
                    <p className="text-sm text-slate-300">{info.details}</p>
                    <p className="text-xs text-slate-400">{info.description}</p>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  </section>

      {/* Location Section */}
      <section className="relative z-10 min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Location</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Visit our headquarters in the heart of innovation</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-[#050A14]/80 backdrop-blur-xl border border-slate-800/40 rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12">
                <h3 className="text-2xl font-bold mb-4">Propheus Headquarters</h3>
                <p className="text-slate-400 mb-6">123 Innovation Drive<br />San Francisco, CA 94105<br />United States</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center mr-4">
                      <span className="text-teal-400">📞</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Phone</p>
                      <p className="text-slate-200">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center mr-4">
                      <span className="text-teal-400">📧</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Email</p>
                      <p className="text-slate-200">hello@propheus.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center mr-4">
                      <span className="text-teal-400">🕒</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Hours</p>
                      <p className="text-slate-200">Monday - Friday: 9AM - 6PM PST</p>
                    </div>
                  </div>
                </div>
                
                <button className="px-6 py-3 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full text-white font-medium hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300">
                  Get Directions
                </button>
              </div>
              
              <div className="h-[400px] lg:h-auto bg-[#070C18]/90 relative overflow-hidden">
                {/* Map placeholder - in a real implementation, you would integrate Google Maps or similar */}
                <div className="absolute inset-0 bg-[#070C18]/90 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🗺️</div>
                    <p className="text-slate-400">Interactive map would be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
