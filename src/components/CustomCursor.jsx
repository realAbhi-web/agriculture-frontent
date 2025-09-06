import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [circlePos, setCirclePos] = useState({ x: 0, y: 0 });

  // Track cursor
  useEffect(() => {
    const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Lagging circle
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setCirclePos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.10,
        y: prev.y + (pos.y - prev.y) * 0.10,
      }));
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [pos]);

  // Bold nearby characters
  useEffect(() => {
    const chars = document.querySelectorAll(".char");
    chars.forEach((char) => {
      const rect = char.getBoundingClientRect();
      const charX = rect.left + rect.width / 2;
      const charY = rect.top + rect.height / 2;

      const dx = pos.x - charX;
      const dy = pos.y - charY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const maxDist = 120; // influence radius
      const strength = Math.max(0, 1 - dist / maxDist);
      const minWeight = 300;
      const maxWeight = 900;

      char.style.fontWeight = Math.round(minWeight + strength * (maxWeight - minWeight));
    });
  }, [pos]);

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
          background: "#ffc21bff",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}
      />
      {/* Lagging Circle */}
      <div
        style={{
          position: "fixed",
          top: circlePos.y,
          left: circlePos.x,
          width: "40px",
          height: "40px",
          border: "3px solid #ffcc00ff",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 9998,
        }}
      />
    </>
  );
}
