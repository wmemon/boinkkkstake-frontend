import React, { useState } from 'react';
import { Coins, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

type NavbarProps = {
  onNavigate: (view: 'home' | 'stake' | 'learn') => void;
  currentView: string;
};

export default function Navbar({ onNavigate, currentView }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (view: 'home' | 'stake' | 'learn') => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigate('home')}
          >
            <img src="/boinkkk.webp" alt="BoinkStake Logo" className="w-24 h-24 filter brightness-0 invert" />
            <span className="text-xl font-bold text-white">BoinkkStake</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => handleNavigate('home')}
              className={`${
                currentView === 'home' 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white'
              } transition-colors`}
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigate('stake')}
              className={`${
                currentView === 'stake' 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white'
              } transition-colors`}
            >
              Stake
            </button>
            <button 
              onClick={() => handleNavigate('learn')}
              className={`${
                currentView === 'learn' 
                  ? 'text-white' 
                  : 'text-white/60 hover:text-white'
              } transition-colors`}
            >
              Learn
            </button>
            <WalletMultiButton />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-black/20 backdrop-blur-lg"
          >
            <div className="px-4 py-4 space-y-4">
              <button 
                onClick={() => handleNavigate('home')}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  currentView === 'home' 
                    ? 'text-white bg-white/10' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                } transition-colors`}
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigate('stake')}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  currentView === 'stake' 
                    ? 'text-white bg-white/10' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                } transition-colors`}
              >
                Stake
              </button>
              <button 
                onClick={() => handleNavigate('learn')}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  currentView === 'learn' 
                    ? 'text-white bg-white/10' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                } transition-colors`}
              >
                Learn
              </button>
              <WalletMultiButton className="w-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}