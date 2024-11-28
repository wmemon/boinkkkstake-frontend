import React from 'react';
import { TrendingUp, Users, Wallet } from 'lucide-react';

const stats = [
  {
    label: 'Total Value Locked',
    value: '$124.5M',
    change: '+12.5%',
    icon: Wallet,
  },
  {
    label: 'Current APY',
    value: '8.2%',
    change: '+0.5%',
    icon: TrendingUp,
  },
  {
    label: 'Active Stakers',
    value: '15.2K',
    change: '+2.1%',
    icon: Users,
  },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-[#FF6F3C] to-[#FFD166]">
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-[#00B8A9] text-sm font-medium">{stat.change}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}