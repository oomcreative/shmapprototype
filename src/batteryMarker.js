import * as React from "react";

const pinStyle = {
  cursor: "pointer",
  fill: "#d00",
  stroke: "none"
};

function BatteryMarker({ size = 35, value = 10 }) {
  //Percentage Battery etc. Three colours for ranges
  const batteryColors = { full: "#0DF641", medium: "#F89420", low: "#E82B2B" };

  const batteryLevel = value >= 50 ? "full" : value > 25 ? "medium" : "low";
  const batterColor = batteryColors[batteryLevel];

  const viewBox = -size / 2 + " " + -size / 2 + " " + size + " " + size;

  return (
    <svg height={size} viewBox={viewBox} style={pinStyle}>
      {/* <path d={ICON} /> */}

      <circle
        r={size / 2 - 3}
        cx={0}
        cy={0}
        stroke={"rgba(0,0,0,.5)"}
        strokeWidth={1}
        fill={batterColor}
      />
      <text
        x={0}
        y={0}
        dy={4}
        fill="black"
        textAnchor="middle"
        fontWeight="600"
        fontSize="13px"
      >
        {value}%
      </text>
    </svg>
  );
}

export default BatteryMarker;
