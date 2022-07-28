import * as React from "react";

const labelStyle = {
  cursor: "pointer",
  fill: "#d00",
  stroke: "none"
};

function Label({ textForLabel = "something", width = 100 }) {
  const text = textForLabel;
  const textBoxHeight = 18;
  const viewBox = "0 0 " + width + " " + textBoxHeight;

  return (
    <svg
      width={width}
      height={textBoxHeight}
      viewBox={viewBox}
      style={labelStyle}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow
            dx="0.2"
            dy="0.4"
            stdDeviation="0.2"
            flood-color="blue"
          />
        </filter>
      </defs>

      <rect x={0} width={width} height={20} fill={"rgba(0,0,0,0.5)"} rx={5} />
      <text
        x={width / 2}
        y={11}
        dy={1}
        fill="white"
        textAnchor="middle"
        fontSize={12}
        fontWeight={600}
      >
        {text}
      </text>
    </svg>
  );
}

export default Label;
