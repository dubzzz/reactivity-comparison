import { Fragment } from "react/jsx-runtime";
import {
  Line,
  Path,
  computeValue,
  filterLines,
  probeCall,
} from "@reactivity-comparison/pivoting";
import Cell from "./Cell";
import { BehaviorSubject } from "rxjs";
import { useWatch } from "../../observables/useWatch";
import { useComputed } from "../../observables/useComputed";
import { useCallback } from "react";

type Props = {
  pathRows: Path[];
  linesSubject: BehaviorSubject<Line[]>;
  rowsDepth: number;
  columnsDepth: number;
  columnPath: Path;
};

export default function CellsColumn(props: Props) {
  probeCall(CellsColumn.name);
  const { pathRows, linesSubject, rowsDepth, columnsDepth, columnPath } = props;
  const filteredLinesCallback = useCallback(
    (lines: Line[]) => filterLines(columnPath.entries, lines),
    [columnPath]
  );
  const filteredLinesSubject = useComputed(filteredLinesCallback, [
    linesSubject,
  ]);
  const filteredLines = useWatch(filteredLinesSubject);
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
}
