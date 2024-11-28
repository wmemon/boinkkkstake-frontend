"use client";
import { useEffect } from "react";
import { motion, useAnimate } from "framer-motion";
import { cn } from "../../lib/utils";

interface ShineBorderProps {
  className?: string;
  duration?: number;
  borderRadius?: string;
  children: React.ReactNode;
}

export function ShineBorder({
  className,
  duration = 4,
  borderRadius = "rounded-2xl",
  children
}: ShineBorderProps) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      scope.current,
      { rotate: 360 },
      { duration, repeat: Infinity, ease: "linear" }
    );
  }, [animate, duration, scope]);

  return (
    <div className={cn("relative", className)}>
      <div className={cn("absolute -inset-[1px] overflow-hidden", borderRadius)}>
        <motion.div
          ref={scope}
          className="absolute inset-[-100%]"
          style={{
            background: `conic-gradient(
              from 0deg at 50% 50%,
              #FF6F3C 0deg,
              transparent 60deg,
              transparent 300deg,
              #FF6F3C 360deg
            )`,
            opacity: 0.5,
          }}
        />
      </div>
      <div className={cn("relative", borderRadius, "bg-[#0F172A]/95")}>
        {children}
      </div>
    </div>
  );
} 