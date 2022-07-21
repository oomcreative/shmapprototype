import * as React from "react";

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  cursor: "pointer",
  fill: "#d00",
  stroke: "none"
};

function Pin({ size = 35, value = 10 }) {
  const viewBox = -size / 2 + " " + -size / 2 + " " + size + " " + size;

  return (
    <svg height={size} viewBox={viewBox} style={pinStyle}>
      {/* <path d={ICON} /> */}

      <circle
        r={size / 2 - 3}
        cx={0}
        cy={0}
        stroke={"rgba(255,0,0,0.5)"}
        strokeWidth={4}
        fill={"#000"}
      />
      <text x={0} y={0} dy={4} fill="white" textAnchor="middle">
        {value}
      </text>
    </svg>
  );
}

export default React.memo(Pin);
