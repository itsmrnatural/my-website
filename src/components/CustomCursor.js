import { useEffect, useRef } from "react";

/**
 * Custom cursor component with negative blend mode effect
 * Creates a circular cursor that follows the mouse
 * @returns {JSX.Element} Custom cursor elements
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    document.addEventListener("mousemove", onMouseMove);

    // Set visible immediately
    cursor.style.opacity = "1";

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
