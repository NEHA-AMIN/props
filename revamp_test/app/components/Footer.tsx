'use client';
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-950 py-8 px-8">
      <div className="flex items-center justify-between">
        {/* Copyright */}
        <div className="text-gray-300 text-sm">
          ©Propheus Pte. Ltd. 2025
        </div>

        {/* Links */}
        <div className="flex items-center gap-12 text-sm">
          <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Terms of use
          </Link>
          {/* <Link href="/products" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Products
          </Link> */}
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
            About Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
