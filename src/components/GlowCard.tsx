import { CSSProperties, ReactNode, useState } from "react";

interface GlowCardProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  glowColor?: string;
}

export function GlowCard({ children, style, className, glowColor = "rgba(26, 110, 245, 0.4)" }: GlowCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        ...style,
      }}
    >
      {isHovered && (
        <div
          style={{
            position: "absolute",
            left: mousePos.x,
            top: mousePos.y,
            width: "300px",
            height: "300px",
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            transition: "opacity 0.3s",
            opacity: isHovered ? 1 : 0,
            zIndex: 0,
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
