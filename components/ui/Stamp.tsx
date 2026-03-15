interface StampProps {
  text: string;
  colour?: string;
  rotation?: number;
  opacity?: number;
  width?: number;
  height?: number;
}

export default function Stamp({
  text,
  colour = "#CC2200",
  rotation = -3,
  opacity = 0.85,
  width = 300,
  height = 110,
}: StampProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotation}deg)`, opacity, display: "block" }}
      aria-label={text}
    >
      {/* Outer border — slightly imperfect via dasharray */}
      <rect
        x="4"
        y="4"
        width={width - 8}
        height={height - 8}
        fill="none"
        stroke={colour}
        strokeWidth="4"
        strokeDasharray="5 1 4 2 6 1 3 2"
        rx="2"
      />
      {/* Inner border */}
      <rect
        x="14"
        y="14"
        width={width - 28}
        height={height - 28}
        fill="none"
        stroke={colour}
        strokeWidth="2"
        strokeDasharray="8 2 5 1 7 2"
        rx="1"
      />
      {/* Stamp text */}
      <text
        x={width / 2}
        y={height / 2 + 10}
        textAnchor="middle"
        fontFamily="'Courier Prime', 'Space Mono', monospace"
        fontSize="34"
        fontWeight="700"
        fill={colour}
        letterSpacing="6"
      >
        {text}
      </text>
    </svg>
  );
}
