import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import StakingCard from './components/StakingCard';
import Learn from './components/Learn';
import { motion } from 'framer-motion';
import { WalletProvider } from './components/WalletProvider';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'stake' | 'learn'>('home');

  const renderContent = () => {
    switch (currentView) {
      case 'learn':
        return <Learn />;
      case 'stake':
        return (
          <div className="max-w-4xl mx-auto">
            <StakingCard />
          </div>
        );
      default:
        return (
          <div className="space-y-16">
            <Hero />
            <div className="flex justify-center py-12">
              <button
                onClick={() => setCurrentView('stake')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF6F3C] to-[#FFD166] text-white font-semibold hover:opacity-90 transition-opacity transform hover:scale-105 duration-200 shadow-lg hover:shadow-[#FF6F3C]/20"
              >
                Start Staking
              </button>
            </div>
            <Stats />
          </div>
        );
    }
  };

  return (
    <WalletProvider>
      <div className="min-h-screen bg-[#0F172A] bg-gradient-to-b from-black to-[#0F172A]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        
        <Navbar onNavigate={setCurrentView} currentView={currentView} />
        
        <main className="relative pt-32 px-4 container mx-auto">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="min-h-[60vh]"
          >
            {renderContent()}
          </motion.div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-0 w-72 h-72 bg-[#FF6F3C] rounded-full filter blur-[128px] opacity-20" />
          <div className="absolute top-40 right-0 w-72 h-72 bg-[#00B8A9] rounded-full filter blur-[128px] opacity-20" />
        </main>
      </div>
    </WalletProvider>
  );
}

export default App;