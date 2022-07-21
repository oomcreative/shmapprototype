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
        <filter id="crispify">
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 1" />
          </feComponentTransfer>
        </filter>
      </defs>

      <rect x={0} width={width} height={16} fill={"rgba(0,0,0,0.8)"} rx={5} />
      <text
        x={width / 2}
        y={10}
        dy={1}
        fill="white"
        textAnchor="middle"
        fontSize={12}
      >
        {text}
      </text>
    </svg>
  );
}

export default React.memo(Label);
