import * as React from "react";

const pinStyle = {
  cursor: "pointer",
  fill: "#d00",
  stroke: "none"
};

function MarkerLaqMax({ size = 35, value = 0 }) {
  //Event Highlights

  const lamaxColors = { full: "#0DF641", medium: "#F89420", low: "#E82B2B" };
  const lamaxLevel = value <= 60 ? "full" : value < 86 ? "medium" : "low";

  const lamaxColor = lamaxColors[lamaxLevel];

  const viewBox = -size / 2 + " " + -size / 2 + " " + size + " " + size;

  return (
    <svg height={size} viewBox={viewBox} style={pinStyle}>
      {/* <path d={ICON} /> */}

      <circle
        r={size / 2 - 3}
        cx={0}
        cy={0}
        stroke={lamaxColor}
        strokeWidth={4}
        fill={lamaxColor}
      ></circle>
      <text
        x={0}
        y={0}
        dy={4}
        fill="white"
        textAnchor="middle"
        fontWeight="600"
        fontSize="13px"
      >
        {value}
      </text>
    </svg>
  );
}

export default MarkerLaqMax;
