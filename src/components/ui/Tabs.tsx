"use client";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

type Tab = {
  title: string;
  value: string;
};

export const Tabs = ({
  tabs: propTabs,
  activeTab,
  onTabChange,
}: {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}) => {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      {propTabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={cn(
            "relative px-4 py-2 rounded-lg text-sm font-medium",
            "transition-colors duration-200",
            activeTab === tab.value ? "text-white" : "text-white/60 hover:text-white"
          )}
        >
          {activeTab === tab.value && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10"
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{tab.title}</span>
        </button>
      ))}
    </div>
  );
}; 