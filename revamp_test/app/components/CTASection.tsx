'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GradientButton } from '@/components/ui/gradient-button';

const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const animationsDisabled = typeof window !== 'undefined' && window.localStorage.getItem('animationsPlayed') === 'true';
  const y = animationsDisabled
    ? (0 as any)
    : useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = animationsDisabled
    ? (1 as any)
    : useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const createEnergyBurst = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    // Create multiple energy particles
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'energy-particle';
      particle.style.left = `${e.clientX - rect.left}px`;
      particle.style.top = `${e.clientY - rect.top}px`;
      particle.style.setProperty('--angle', `${(360 / 8) * i}deg`);
      button.appendChild(particle);

      setTimeout(() => particle.remove(), 1000);
    }
  };

  const handleDemoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createEnergyBurst(e);
    setTimeout(() => {
      window.location.href = '/book-demo';
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setShowSuccess(false);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <>
      <style jsx>{`
        .neural-grid {
          background-image:
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.05) 0%, transparent 50%),
            linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.03) 25%, rgba(59, 130, 246, 0.03) 26%, transparent 27%, transparent 74%, rgba(168, 85, 247, 0.03) 75%, rgba(168, 85, 247, 0.03) 76%, transparent 77%),
            linear-gradient(90deg, transparent 24%, rgba(20, 184, 166, 0.03) 25%, rgba(20, 184, 166, 0.03) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.03) 75%, rgba(59, 130, 246, 0.03) 76%, transparent 77%);
          background-size: 60px 60px, 80px 80px, 100px 100px, 40px 40px, 40px 40px;
          animation: neural-pulse 8s ease-in-out infinite;
        }

        @keyframes neural-pulse {
          0%, 100% { background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%; }
          50% { background-position: 10% 10%, -10% -10%, 5% -5%, 2% 2%, -2% -2%; }
        }

        .ai-orb {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.4), rgba(168, 85, 247, 0.2), transparent);
          filter: blur(1px);
          animation: orb-float 6s ease-in-out infinite;
        }

        .ai-orb:nth-child(2) {
          width: 80px;
          height: 80px;
          background: radial-gradient(circle at 40% 40%, rgba(20, 184, 166, 0.3), rgba(59, 130, 246, 0.1), transparent);
          animation-delay: -2s;
          animation-duration: 8s;
        }

        .ai-orb:nth-child(3) {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle at 60% 20%, rgba(168, 85, 247, 0.2), rgba(20, 184, 166, 0.1), transparent);
          animation-delay: -4s;
          animation-duration: 10s;
        }

        @keyframes orb-float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -20px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }

        .cta-main-button {
          position: relative;
          padding: 18px 48px;
          font-size: 1.25rem;
          font-weight: 700;
          border: none;
          border-radius: 16px;
          background: linear-gradient(135deg,
            #3b82f6 0%,
            #8b5cf6 50%,
            #06b6d4 100%);
          color: white;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow:
            0 8px 32px rgba(59, 130, 246, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .cta-main-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s;
        }

        .cta-main-button:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow:
            0 12px 40px rgba(59, 130, 246, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }

        .cta-main-button:hover::before {
          left: 100%;
        }

        .cta-main-button:active {
          transform: translateY(0) scale(1.02);
        }

        .energy-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, #fff, #3b82f6);
          border-radius: 50%;
          pointer-events: none;
          animation: energy-burst 1s ease-out forwards;
        }

        @keyframes energy-burst {
          0% {
            transform: translateX(0) translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(calc(cos(var(--angle)) * 60px)) translateY(calc(sin(var(--angle)) * 60px)) scale(0);
            opacity: 0;
          }
        }

        .newsletter-container {
          background: rgba(15, 15, 15, 0.8);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 24px;
          padding: 32px;
          backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
        }

        .newsletter-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
        }

        .newsletter-input {
          flex: 1;
          padding: 16px 20px;
          background: rgba(30, 30, 30, 0.8);
          border: 2px solid rgba(75, 85, 99, 0.3);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s ease;
          outline: none;
        }

        .newsletter-input:focus {
          border-color: rgba(59, 130, 246, 0.6);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1), 0 0 20px rgba(59, 130, 246, 0.2);
          transform: scale(1.02);
        }

        .newsletter-input::placeholder {
          color: rgba(156, 163, 175, 0.8);
        }

        .newsletter-submit {
          padding: 16px 32px;
          background: linear-gradient(135deg, #059669, #0d9488);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          min-width: 140px;
        }

        .newsletter-submit:hover {
          background: linear-gradient(135deg, #047857, #0f766e);
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(5, 150, 105, 0.3);
        }

        .newsletter-submit.is-loading .label {
          opacity: 0;
        }

        .newsletter-submit .spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: spin 1s linear infinite;
          opacity: 0;
        }

        .newsletter-submit.is-loading .spinner {
          opacity: 1;
        }

        .newsletter-submit.is-done {
          background: linear-gradient(135deg, #059669, #10b981);
        }

        .newsletter-submit.is-done .check {
          opacity: 1;
        }

        .newsletter-submit .check {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .newsletter-submit .check::after {
          content: '✓';
          color: white;
          font-size: 18px;
          font-weight: bold;
        }

        @keyframes spin {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .success-message {
          margin-top: 16px;
          padding: 12px 20px;
          background: rgba(5, 150, 105, 0.1);
          border: 1px solid rgba(5, 150, 105, 0.3);
          border-radius: 8px;
          color: #10b981;
          text-align: center;
          transform: translateY(-10px);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .success-message.show {
          transform: translateY(0);
          opacity: 1;
        }

        .interactive-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(59, 130, 246, 0.05),
            transparent 40%
          );
          transition: opacity 0.3s ease;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="cta-section"
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden"
        style={{
          '--mouse-x': `${mousePosition.x * 100}%`,
          '--mouse-y': `${mousePosition.y * 100}%`,
        } as React.CSSProperties}
      >
        {/* Particle canvas for occasional dynamic particles */}
        <canvas ref={particlesRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-30" />

        {/* Interactive Mouse Background */}
        <div className="interactive-bg" />

        {/* Neural Grid Background */}
        <div className="absolute inset-0 neural-grid opacity-60" />

        {/* Floating AI Orbs */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y, opacity }}
        >
          <div className="ai-orb absolute top-1/4 left-1/4" />
          <div className="ai-orb absolute top-3/4 right-1/4" />
          <div className="ai-orb absolute bottom-1/3 left-2/3" />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Main CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as any }}
            className="mb-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-6">
                🤖 Physical AI Revolution
              </span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Ready to Revolutionize<br />
              <span className="text-white">Your Industry?</span>
            </motion.h2>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Experience the future where AI transcends screens and transforms reality.
              See Propheus Physical AI solutions in action.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <GradientButton
                onClick={handleDemoClick}
                aria-label="Book a demo with Propheus"
              >
                Book a Demo!
              </GradientButton>
            </motion.div>
          </motion.div>

          {/* Elegant Divider */}
          <motion.div
            className="flex items-center justify-center mb-16"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent w-full max-w-2xl" />
            <div className="mx-4 p-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent w-full max-w-2xl" />
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <div className="newsletter-container">
              <motion.h3
                className="text-2xl md:text-3xl font-semibold mb-4 text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Stay at the Forefront of Physical AI
              </motion.h3>

              <motion.p
                className="text-gray-300 mb-8 text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                For more on Physical AI, industry news, and Propheus offerings and impact, sign up for our newsletter!
              </motion.p>

              <motion.form
                onSubmit={handleSubmit}
                className="newsletter-form"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="flex flex-col sm:flex-row gap-4 items-stretch">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    aria-label="Email address"
                    className="newsletter-input"
                  />
                  <GradientButton
                    type="submit"
                    disabled={submitting}
                    className={submitting ? 'opacity-50 cursor-not-allowed' : submitted ? 'bg-green-500' : ''}
                  >
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      </span>
                    ) : submitted ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Done
                      </span>
                    ) : (
                      'Subscribe'
                    )}
                  </GradientButton>
                </div>

                <div className={`success-message ${showSuccess ? 'show' : ''}`}>
                  🎉 Thanks! You're now part of the Physical AI revolution.
                </div>
              </motion.form>
            </div>
          </motion.div>
        </div>

        {/* Subtle AI Network Lines */}
        <motion.svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          style={{ y }}
          viewBox="0 0 1200 800"
          fill="none"
        >
          <motion.path
            d="M200 200 Q 400 100 600 200 T 1000 200"
            stroke="url(#gradient1)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />
          <motion.path
            d="M100 400 Q 300 300 500 400 T 900 400"
            stroke="url(#gradient2)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0)" />
              <stop offset="50%" stopColor="rgba(168, 85, 247, 0.5)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
            </linearGradient>
          </defs>
        </motion.svg>
      </section>
    </>
  );
};

export default CTASection;