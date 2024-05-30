import { probeCall, cellSize } from "@reactivity-comparison/pivoting";

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
        position: "absolute",
        top: offsetY * cellSize,
        left: offsetX * cellSize,
        width: cellSize,
        height: cellSize,
        border: "1px solid #aaa",
        overflow: "hidden",
      }}
    >
      {value}
    </div>
  );
}
