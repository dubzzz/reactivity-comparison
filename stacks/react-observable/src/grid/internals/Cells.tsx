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
import { BehaviorSubject } from "rxjs";
import { useWatch } from "../../observables/useWatch";

type Props = {
  columns: HeaderTree[];
  rows: HeaderTree[];
  linesSubject: BehaviorSubject<Line[]>;
  rowsDepth: number;
  columnsDepth: number;
};

export default function Cells(props: Props) {
  probeCall(Cells.name);
  const { columns, rows, linesSubject, rowsDepth, columnsDepth } = props;
  const pathColumns = computePaths(columns);
  const pathRows = computePaths(rows);
  const lines = useWatch(linesSubject);
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
