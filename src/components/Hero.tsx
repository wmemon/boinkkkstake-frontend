import React from 'react';
import { Coins } from 'lucide-react';
import { TypewriterEffect } from './ui/TypewriterEffect';

export default function Hero() {
  const words = [
    {
      text: "Liquid",
      className: "text-[#FF6F3C]"
    },
    {
      text: "Staking",
      className: "text-[#FFD166]"
    },
    {
      text: "Made",
      className: "text-[#00B8A9]"
    },
    {
      text: "Fun!",
      className: "text-[#00B8A9]"
    }
  ];

  return (
    <div className="text-center space-y-8">
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
        <Coins className="w-5 h-5 text-[#FFD166]" />
        <span className="text-white/80 text-sm">
          Now live with 8.2% APY
        </span>
      </div>
      
      <TypewriterEffect
        words={words}
        className="text-5xl md:text-7xl"
      />
      
      <p className="text-xl text-white/60 max-w-2xl mx-auto">
        Stake your SOL and earn $BOINKK tokens while maintaining liquidity.
        Simple, secure, and surprisingly fun!
      </p>
    </div>
  );
}