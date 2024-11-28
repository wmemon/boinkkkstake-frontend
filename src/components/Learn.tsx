import React from 'react';
import { BookOpen, Shield, Coins, ArrowRight, Zap, Users, PiggyBank } from 'lucide-react';
import { ShineBorder } from './ui/ShineBorder';

const guides = [
  {
    title: 'What is Liquid Staking?',
    description: 'Learn how liquid staking allows you to earn rewards while maintaining liquidity.',
    icon: BookOpen,
    readTime: '3 min',
  },
  {
    title: 'Security & Audits',
    description: 'Understand how we keep your assets safe through multiple security layers.',
    icon: Shield,
    readTime: '4 min',
  },
  {
    title: '$BOINKK Tokenomics',
    description: 'Deep dive into $BOINKK token mechanics and distribution.',
    icon: Coins,
    readTime: '5 min',
  },
];

const features = [
  {
    title: 'Instant Liquidity',
    description: 'Receive $BOINKK tokens instantly when you stake SOL.',
    icon: Zap,
  },
  {
    title: 'Community Governed',
    description: 'Participate in governance decisions with your $BOINKK tokens.',
    icon: Users,
  },
  {
    title: 'Compound Rewards',
    description: 'Automatically reinvest your staking rewards for optimal returns.',
    icon: PiggyBank,
  },
];

export default function Learn() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Learn About BoinkkStake
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Everything you need to know about liquid staking and how to make the most of your SOL.
        </p>
      </div>

      {/* Quick Start Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <ShineBorder key={guide.title}>
            <div className="group p-6 hover:bg-white/[0.15] transition-all cursor-pointer">
              <div className="space-y-4">
                <div className="p-3 w-fit rounded-xl bg-gradient-to-br from-[#FF6F3C] to-[#FFD166]">
                  <guide.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-white">{guide.title}</h3>
                <p className="text-white/60">{guide.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/40">{guide.readTime} read</span>
                  <ArrowRight className="w-5 h-5 text-[#FF6F3C] transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </ShineBorder>
        ))}
      </div>

      {/* Features Grid */}
      <ShineBorder borderRadius="rounded-3xl">
        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="space-y-4">
                <div className="p-3 w-fit rounded-xl bg-white/10">
                  <feature.icon className="w-6 h-6 text-[#FFD166]" />
                </div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </ShineBorder>

      {/* FAQ Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-white text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              q: "What's the minimum staking amount?",
              a: "The minimum amount to stake is 0.1 SOL. This ensures efficient processing and reasonable rewards generation.",
            },
            {
              q: "How are rewards calculated?",
              a: "Rewards are calculated based on your staked amount and the current APY of 8.2%. Rewards are automatically compounded daily.",
            },
            {
              q: "Can I unstake at any time?",
              a: "Yes! That's the beauty of liquid staking. You can trade your $BOINKK tokens anytime or redeem them for SOL after the unbonding period.",
            },
            {
              q: "Is my stake safe?",
              a: "We employ multiple security measures and have undergone thorough audits by leading firms to ensure the safety of your funds.",
            },
          ].map((faq, i) => (
            <ShineBorder key={i}>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-white/60">{faq.a}</p>
              </div>
            </ShineBorder>
          ))}
        </div>
      </div>
    </div>
  );
}