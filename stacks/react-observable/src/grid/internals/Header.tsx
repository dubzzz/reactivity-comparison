import { probeCall, cellSize } from "@reactivity-comparison/pivoting";

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
        position: "absolute",
        top: offsetY * cellSize,
        left: offsetX * cellSize,
        width: sizeX * cellSize,
        height: sizeY * cellSize,
        border: "1px solid #aaa",
        backgroundColor: "#eee",
        overflow: "hidden",
      }}
    >
      {value}
    </div>
  );
}
