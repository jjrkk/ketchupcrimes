interface CrimeTapeProps {
  width?: string;
  height?: number;
}

export default function CrimeTape({ width = "100%", height = 32 }: CrimeTapeProps) {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="crime-tape-stripes"
          x="0"
          y="0"
          width="40"
          height="40"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <rect width="20" height="40" fill="#F5C518" />
          <rect x="20" width="20" height="40" fill="#0A0A0A" />
        </pattern>
      </defs>
      <rect width="100%" height={height} fill="url(#crime-tape-stripes)" />
    </svg>
  );
}
