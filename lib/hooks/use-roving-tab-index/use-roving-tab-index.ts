import React, { useState, useRef, useEffect } from "react";

type RefElement = HTMLButtonElement | null;

/**
 * A React hook implementing the roving tabindex pattern.
 * Manages focus among a group of focusable elements using arrow keys, Home, and End.
 *
 * @param {number} count - Total number of focusable elements.
 * @returns {{
 *   refs: React.MutableRefObject<(HTMLButtonElement | null)[]>,
 *   index: number,
 *   setIndex: React.Dispatch<React.SetStateAction<number>>,
 *   onKeyDown: (e: React.KeyboardEvent) => void
 * }} Roving tab index state and handlers.
 */
export function useRovingTabIndex(count: number) {
  const [index, setIndex] = useState<number>(0);
  const refs = useRef<RefElement[]>([]);

  useEffect(() => {
    refs.current[index]?.focus();
  }, [index]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (i + 1) % count);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (i - 1 + count) % count);
    } else if (e.key === "Home") {
      e.preventDefault();
      setIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setIndex(count - 1);
    }
  };

  return { refs, index, setIndex, onKeyDown };
}
