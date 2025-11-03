import React from "react";

/**
 * A React hook that implements focus trapping within a container element.
 * When active, it ensures focus stays within the container by cycling through
 * focusable elements when Tab/Shift+Tab is pressed at the boundaries.
 *
 * @param {boolean} active - Whether the focus trap is currently active.
 * @param {React.RefObject<HTMLElement | null>} containerRef - Ref to the container element that should trap focus.
 * @returns {void} This hook manages focus behavior through side effects.
 */
export function useFocusTrap(
  active: boolean,
  containerRef: React.RefObject<HTMLElement | null>
) {
  React.useEffect(() => {
    if (!active || !containerRef.current) return;

    const el = containerRef.current;
    const focusable = () =>
      Array.from(
        el.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"]),textarea,input,select'
        )
      ).filter(
        (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden")
      );

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const first = focusable()[0];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const nodes = focusable();
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    el.addEventListener("keydown", onKeyDown);

    return () => {
      el.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [active, containerRef]);
}
