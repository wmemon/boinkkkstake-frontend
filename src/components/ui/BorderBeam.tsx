"use client";
import { useEffect } from "react";
import { motion, useAnimate } from "framer-motion";
import { cn } from "../../lib/utils";

interface BorderBeamProps {
  className?: string;
  duration?: number;
  delay?: number;
}

export function BorderBeam({
  className,
  duration = 8,
  delay = 0,
}: BorderBeamProps) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      scope.current,
      { rotate: 360 },
      { duration, repeat: Infinity, ease: "linear", delay }
    );
  }, [animate, duration, delay, scope]);

  return (
    <div className={cn("absolute inset-0", className)}>
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <motion.div
          ref={scope}
          className="absolute -inset-[10%]"
          style={{
            background: `
              linear-gradient(90deg, transparent 0%, #FF6F3C 50%, transparent 100%),
              linear-gradient(0deg, transparent 0%, #FF4500 50%, transparent 100%)
            `,
            opacity: 0.8,
            filter: 'blur(8px)',
            mixBlendMode: 'screen',
          }}
        />
      </div>
      <div className="absolute inset-[2px] rounded-3xl bg-[#0F172A]/80" />
    </div>
  );
} 