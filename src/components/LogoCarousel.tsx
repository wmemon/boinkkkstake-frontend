import { Coins, Shield, Wallet, PiggyBank } from 'lucide-react';

export default function LogoCarousel() {
  // Using Lucide icons instead of images for simplicity
  const logos = [
    { icon: Coins, name: 'Phantom' },
    { icon: Shield, name: 'Solflare' },
    { icon: Wallet, name: 'Magic Eden' },
    { icon: PiggyBank, name: 'Marinade' },
  ];

  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll">
        {logos.map((logo, index) => (
          <li key={index} className="flex items-center justify-center">
            <logo.icon className="w-8 h-8 text-white/40" />
          </li>
        ))}
      </ul>
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 animate-infinite-scroll" aria-hidden="true">
        {logos.map((logo, index) => (
          <li key={index} className="flex items-center justify-center">
            <logo.icon className="w-8 h-8 text-white/40" />
          </li>
        ))}
      </ul>
    </div>
  );
} 