import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        style={{
          position: "fixed",
          top: pos.y,
          left: pos.x,
          width: "12px",
          height: "12px",
          background: "#ad8a18ff",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}
      />
      {/* Circle */}
      <div
        style={{
          position: "fixed",
          top: pos.y,
          left: pos.x,
          width: "40px",
          height: "40px",
          border: "3px solid #e7dd21ff",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          transition: "top 0.1s ease, left 0.1s ease",
          zIndex: 9998,
        }}
      />
    </>
  );
}
