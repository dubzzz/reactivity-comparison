import { Fragment } from "react/jsx-runtime";
import {
  Line,
  Path,
  filterLines,
  probeCall,
} from "@reactivity-comparison/pivoting";
import { BehaviorSubject } from "rxjs";
import { useComputed } from "../../observables/useComputed";
import CellsWrapper from "./CellWrapper";

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
  const filteredLinesSubject = useComputed(
    (lines) => filterLines(columnPath.entries, lines),
    [linesSubject]
  );
  return (
    <Fragment key={columnPath.offset}>
      {pathRows.map((rowPath) => (
        <CellsWrapper
          key={rowPath.offset}
          entries={rowPath.entries}
          linesSubject={filteredLinesSubject}
          offsetX={columnPath.offset + rowsDepth}
          offsetY={rowPath.offset + columnsDepth}
        />
      ))}
    </Fragment>
  );
}
