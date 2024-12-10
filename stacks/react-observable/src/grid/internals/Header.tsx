import {
  probeCall,
  cellSize,
  cellHeight,
} from "@reactivity-comparison/pivoting";

type Props = {
  value: string;
  offsetX: number;
  offsetY: number;
  sizeX: number;
  sizeY: number;
};

export default function Header(props: Props) {
  probeCall(Header.name);
  const { value, offsetX, offsetY, sizeX, sizeY } = props;
  return (
    <div
      style={{
        boxSizing: "border-box",
        position: "absolute",
        top: offsetY * cellHeight,
        left: offsetX * cellSize,
        width: sizeX * cellSize,
        height: sizeY * cellHeight,
        color: "rgb(104,114,133)",
        border: "1px solid #e5e6e8",
        backgroundColor: "rgb(247,247,248)",
        overflow: "hidden",
        padding: "4px 8px",
      }}
    >
      {value}
    </div>
  );
}
