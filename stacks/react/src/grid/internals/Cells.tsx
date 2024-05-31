import { Fragment } from "react/jsx-runtime";
import {
  Line,
  Path,
  computeValue,
  filterLines,
  probeCall,
} from "@reactivity-comparison/pivoting";
import Cell from "./Cell";

type Props = {
  columnsPaths: Path[];
  rowsPaths: Path[];
  lines: Line[];
  rowsDepth: number;
  columnsDepth: number;
};

export default function Cells(props: Props) {
  probeCall(Cells.name);
  const { columnsPaths, rowsPaths, lines, rowsDepth, columnsDepth } = props;
  return (
    <>
      {columnsPaths.map((columnPath) => {
        const filteredLines = filterLines(columnPath.entries, lines);
        return (
          <Fragment key={columnPath.offset}>
            {rowsPaths.map((rowPath) => (
              <Cell
                key={rowPath.offset}
                value={computeValue(rowPath.entries, filteredLines)}
                offsetX={columnPath.offset + rowsDepth}
                offsetY={rowPath.offset + columnsDepth}
              />
            ))}
          </Fragment>
        );
      })}
    </>
  );
}
