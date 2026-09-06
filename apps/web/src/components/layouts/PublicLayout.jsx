import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Button } from '@bravevest/ui/components';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-brave-light-gray bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-light text-brave-black">
            BraveVest
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/opportunities" className="text-sm text-brave-gray hover:text-brave-black transition-colors">
              Opportunities
            </Link>
            <Link to="/how-it-works" className="text-sm text-brave-gray hover:text-brave-black transition-colors">
              How It Works
            </Link>
            <Link to="/about" className="text-sm text-brave-gray hover:text-brave-black transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" variant="primary">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-brave-light-gray py-8 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-brave-gray">
          © 2026 BraveVest. All rights reserved.
        </div>
      </footer>
    </div>
  );
}