"use client";
import React, { useEffect } from "react";
import { motion, useAnimate } from "framer-motion";
import { cn } from "../../lib/utils";

type ExpandableProps = {
  children: React.ReactNode;
  expanded: boolean;
  className?: string;
};

export function Expandable({ children, expanded, className }: ExpandableProps) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (scope.current) {
      animate(
        scope.current,
        { height: expanded ? "auto" : 0 },
        { duration: 0.2, ease: "easeInOut" }
      );
    }
  }, [expanded, animate, scope]);

  return (
    <motion.div
      ref={scope}
      className={cn("overflow-hidden", className)}
      initial={{ height: 0 }}
    >
      {children}
    </motion.div>
  );
} 