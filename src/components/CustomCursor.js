import { useEffect, useRef } from "react";

/**
 * Custom cursor component with negative blend mode effect
 * Creates a circular cursor with a dot in the center
 * @returns {JSX.Element} Custom cursor elements
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;

    if (!cursor || !dot) return;

    const onMouseMove = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const onMouseEnter = () => {
      cursor.style.opacity = "1";
      dot.style.opacity = "1";
    };

    const onMouseLeave = () => {
      cursor.style.opacity = "0";
      dot.style.opacity = "0";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" style={{ opacity: 0 }} />
      <div ref={dotRef} className="custom-cursor-dot" style={{ opacity: 0 }} />
    </>
  );
}
