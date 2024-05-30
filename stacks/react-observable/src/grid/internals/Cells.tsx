import {
  HeaderTree,
  Line,
  computePaths,
  probeCall,
} from "@reactivity-comparison/pivoting";
import { BehaviorSubject } from "rxjs";
import CellsColumn from "./CellsColumn";

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
  return (
    <>
      {pathColumns.map((columnPath) => {
        return (
          <CellsColumn
            key={columnPath.offset}
            pathRows={pathRows}
            columnPath={columnPath}
            columnsDepth={columnsDepth}
            linesSubject={linesSubject}
            rowsDepth={rowsDepth}
          />
        );
      })}
    </>
  );
}
