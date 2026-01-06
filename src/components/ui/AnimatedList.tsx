import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number, isSelected: boolean) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  onItemSelect?: (item: T, index: number) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  className?: string;
  itemClassName?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
  staggerDelay?: number;
  animationDuration?: number;
  exitAnimation?: boolean;
}

const listItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20, 
    scale: 0.95,
    filter: "blur(4px)"
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }),
  exit: { 
    opacity: 0, 
    y: -10, 
    scale: 0.98,
    filter: "blur(2px)",
    transition: { duration: 0.2 }
  }
};

export function AnimatedList<T>({
  items,
  renderItem,
  keyExtractor,
  onItemSelect,
  showGradients = false,
  enableArrowNavigation = false,
  className,
  itemClassName,
  displayScrollbar = true,
  initialSelectedIndex = -1,
  staggerDelay = 0.08,
  animationDuration = 0.4,
  exitAnimation = true,
}: AnimatedListProps<T>) {
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const customVariants: Variants = {
    hidden: listItemVariants.hidden,
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * staggerDelay,
        duration: animationDuration,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }),
    exit: listItemVariants.exit
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enableArrowNavigation || items.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = prev < items.length - 1 ? prev + 1 : prev;
          return next;
        });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = prev > 0 ? prev - 1 : prev;
          return next;
        });
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        onItemSelect?.(items[selectedIndex], selectedIndex);
      }
    },
    [enableArrowNavigation, items, selectedIndex, onItemSelect]
  );

  useEffect(() => {
    if (enableArrowNavigation) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [enableArrowNavigation, handleKeyDown]);

  useEffect(() => {
    if (selectedIndex >= 0 && itemRefs.current.has(selectedIndex)) {
      itemRefs.current.get(selectedIndex)?.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }, [selectedIndex]);

  const handleItemClick = (item: T, index: number) => {
    setSelectedIndex(index);
    onItemSelect?.(item, index);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Top gradient overlay */}
      {showGradients && (
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      )}

      {/* Scrollable container */}
      <div
        ref={containerRef}
        className={cn(
          "overflow-y-auto",
          !displayScrollbar && "scrollbar-hide",
          displayScrollbar && "scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
        )}
      >
        <AnimatePresence mode={exitAnimation ? "popLayout" : "sync"}>
          {items.map((item, index) => (
            <motion.div
              key={keyExtractor(item, index)}
              ref={(el) => {
                if (el) itemRefs.current.set(index, el);
              }}
              custom={index}
              variants={customVariants}
              initial="hidden"
              animate="visible"
              exit={exitAnimation ? "exit" : undefined}
              className={cn(
                "transition-colors",
                enableArrowNavigation && selectedIndex === index && "ring-2 ring-primary/50 rounded-lg",
                itemClassName
              )}
              onClick={() => handleItemClick(item, index)}
            >
              {renderItem(item, index, selectedIndex === index)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom gradient overlay */}
      {showGradients && (
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
      )}
    </div>
  );
}

// Simple wrapper for staggered grid items
export function AnimatedGrid<T>({
  items,
  renderItem,
  keyExtractor,
  className,
  itemClassName,
  staggerDelay = 0.1,
}: Pick<AnimatedListProps<T>, "items" | "renderItem" | "keyExtractor" | "className" | "itemClassName" | "staggerDelay">) {
  const customVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95 
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * staggerDelay,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  return (
    <div className={className}>
      {items.map((item, index) => (
        <motion.div
          key={keyExtractor(item, index)}
          custom={index}
          variants={customVariants}
          initial="hidden"
          animate="visible"
          className={itemClassName}
        >
          {renderItem(item, index, false)}
        </motion.div>
      ))}
    </div>
  );
}

export default AnimatedList;
