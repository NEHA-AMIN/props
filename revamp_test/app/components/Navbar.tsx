'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  React.useEffect(() => {
    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Only hide the navbar on the homepage until the user scrolls
  if (pathname === '/' && !isVisible) {
    return null;
  }

  return (
    <>
      <nav className="fixed top-4 left-4 right-4 z-[100] rounded-3xl border border-white/10 bg-black/70 backdrop-blur-md shadow-lg transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-end items-center h-16 gap-12">
            {/* Logo Section */}
            <div className="flex-1">
              <Link href="/" className="block cursor-pointer group">
                <div className="flex items-center transition-opacity duration-200 group-hover:opacity-80">
                  <div className="relative h-10 w-32">
                    <Image
                      src="/image.png"
                      alt="Propheus Logo"
                      fill
                      style={{ objectFit: 'contain' }}
                      className="transition-opacity duration-200"
                      priority
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center justify-end space-x-12">
              {[
                { name: 'Industries', href: '/industries' },
                { name: 'Resources', href: '/resources' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-slate-300 hover:text-primary-300 transition-colors duration-200 font-normal text-base group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-gradient-to-r from-primary-400/80 to-secondary-400/80 group-hover:w-full transition-all duration-300 blur-[3px] shadow-[0_0_8px_rgba(45,212,191,0.7)]" />
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-primary-400 to-secondary-400 group-hover:w-full transition-all duration-300 shadow-[0_0_5px_rgba(45,212,191,1)]" />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-slate-300 hover:text-white p-1.5 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                <div className="relative w-4 h-4">
                  <span
                    className={`absolute left-0 top-0.5 w-full h-[1px] bg-current transform transition-all duration-300 ease-in-out ${
                      isMenuOpen ? 'rotate-45 translate-y-[5px]' : ''
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[7px] w-full h-[1px] bg-current transform transition-all duration-300 ease-in-out ${
                      isMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[13px] w-full h-[1px] bg-current transform transition-all duration-300 ease-in-out ${
                      isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[150] md:hidden transition-all duration-500 ease-out ${
          isMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible'
        }`}
      >
        {/* Background Overlay - Solid Black */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Menu Content */}
        <div 
          className={`relative h-full flex flex-col transition-all duration-700 ease-out ${
            isMenuOpen 
              ? 'translate-x-0 opacity-100' 
              : 'translate-x-8 opacity-0'
          }`}
        >
          {/* Header with Logo and Close Button */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-cyan-500/10">
            <Link href="/" onClick={closeMenu} className="block">
              <div className="relative h-10 w-32">
                <Image
                  src="/image.png"
                  alt="Propheus Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </Link>
            
            <button
              onClick={closeMenu}
              className="p-2 text-slate-300 hover:text-cyan-400 transition-colors duration-200"
              aria-label="Close menu"
            >
              <svg 
                className="w-7 h-7" 
                fill="none" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-start pt-16 px-8 space-y-2">
            {[
              { name: 'Industries', href: '/industries', delay: 100 },
              { name: 'Resources', href: '/resources', delay: 200 },
              { name: 'Contact', href: '/contact', delay: 300 },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className={`group relative block py-6 text-4xl font-light text-white hover:text-cyan-400 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: isMenuOpen ? `${link.delay}ms` : '0ms'
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>


        </div>

        {/* Cyber Accent Lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      </div>
    </>
  );
};

export default Navbar;