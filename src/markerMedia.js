import * as React from "react";

const pinStyle = {
  cursor: "pointer",
  fill: "#d00",
  stroke: "none"
};

function MarkerMedia({ size = 35, value = 0 }) {
  //Event Highlights
  const eventHighLightColor = "#00D1FF";
  const eventColor = value > 0 ? eventHighLightColor : "none";

  value = value === 0 ? "-" : value;

  const viewBox = -size / 2 + " " + -size / 2 + " " + size + " " + size;

  const animationColors =
    eventHighLightColor + ";" + "#0EA6C8;" + eventHighLightColor;

  return (
    <svg height={size} viewBox={viewBox} style={pinStyle}>
      {/* <path d={ICON} /> */}

      <circle
        r={size / 2 - 3}
        cx={0}
        cy={0}
        stroke={eventColor}
        strokeWidth={4}
        fill={"#000"}
      >
        {value > 0 ? (
          <animate
            attributeName="stroke"
            values={animationColors}
            dur="3s"
            repeatCount="indefinite"
          />
        ) : null}
      </circle>
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

export default MarkerMedia;
