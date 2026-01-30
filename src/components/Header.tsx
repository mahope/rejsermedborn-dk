'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CATEGORIES } from '@/lib/categories';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-bold text-xl text-gray-900">
              RejserMedBørn<span className="text-emerald-600">.dk</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/produkter" className="text-slate-700 hover:text-emerald-600 font-medium">
              Alle guides
            </Link>

            {/* Dropdown for categories */}
            <div className="relative group">
              <button className="text-slate-700 hover:text-emerald-600 font-medium flex items-center gap-1">
                Kategorier
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {CATEGORIES.filter((c) => c.slug !== 'andet').map((category) => (
                  <Link
                    key={category.slug}
                    href={`/produkter/${category.slug}`}
                    className="block px-4 py-2 text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/blog" className="text-slate-700 hover:text-emerald-600 font-medium">
              Blog
            </Link>

            <Link href="/om-os" className="text-slate-700 hover:text-emerald-600 font-medium">
              Om os
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link
                href="/produkter"
                className="text-slate-700 hover:text-emerald-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Alle guides
              </Link>

              <div className="pl-4 space-y-2">
                {CATEGORIES.filter((c) => c.slug !== 'andet').map((category) => (
                  <Link
                    key={category.slug}
                    href={`/produkter/${category.slug}`}
                    className="block text-slate-600 hover:text-emerald-600 text-sm"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              <Link
                href="/blog"
                className="text-slate-700 hover:text-emerald-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>

              <Link
                href="/om-os"
                className="text-slate-700 hover:text-emerald-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Om os
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
