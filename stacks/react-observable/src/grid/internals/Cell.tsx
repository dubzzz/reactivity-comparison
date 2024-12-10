import {
  probeCall,
  cellSize,
  cellHeight,
} from "@reactivity-comparison/pivoting";

type Props = {
  value: number;
  offsetX: number;
  offsetY: number;
};

export default function Cell(props: Props) {
  probeCall(Cell.name);
  const { value, offsetX, offsetY } = props;
  return (
    <div
      style={{
        boxSizing: "border-box",
        position: "absolute",
        top: offsetY * cellHeight,
        left: offsetX * cellSize,
        width: cellSize,
        height: cellHeight,
        color: "#000",
        border: "1px solid #ededef",
        backgroundColor: "rgb(255,255,255)",
        overflow: "hidden",
        padding: "4px 8px",
      }}
    >
      {value}
    </div>
  );
}
