import { Fragment } from "react/jsx-runtime";
import {
  HeaderTree,
  Line,
  computePaths,
  computeValue,
  filterLines,
  probeCall,
} from "@reactivity-comparison/pivoting";
import Cell from "./Cell";

type Props = {
  columns: HeaderTree[];
  rows: HeaderTree[];
  lines: Line[];
  rowsDepth: number;
  columnsDepth: number;
};

export default function Cells(props: Props) {
  probeCall(Cells.name);
  const { columns, rows, lines, rowsDepth, columnsDepth } = props;
  const pathColumns = computePaths(columns);
  const pathRows = computePaths(rows);
  return (
    <>
      {pathColumns.map((columnPath) => {
        const filteredLines = filterLines(columnPath.entries, lines);
        return (
          <Fragment key={columnPath.offset}>
            {pathRows.map((rowPath) => (
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
