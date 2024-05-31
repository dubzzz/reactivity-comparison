import { Line, Path, probeCall } from "@reactivity-comparison/pivoting";
import { BehaviorSubject } from "rxjs";
import { useWatch } from "../../observables/useWatch";
import CellsWrapper from "./CellWrapper";
import { Fragment } from "react";

type Props = {
  columnsPathsSubject: BehaviorSubject<Path[]>;
  rowsPathsSubject: BehaviorSubject<Path[]>;
  linesSubject: BehaviorSubject<Line[]>;
  rowsDepth: number;
  columnsDepth: number;
};

export default function Cells(props: Props) {
  probeCall(Cells.name);
  const {
    columnsPathsSubject,
    rowsPathsSubject,
    linesSubject,
    rowsDepth,
    columnsDepth,
  } = props;
  const columnsPaths = useWatch(columnsPathsSubject);
  const rowsPaths = useWatch(rowsPathsSubject);
  return (
    <>
      {columnsPaths.map((columnPath) => {
        return (
          <Fragment key={columnPath.offset}>
            {rowsPaths.map((rowPath) => (
              <CellsWrapper
                key={rowPath.offset}
                entries={[...columnPath.entries, ...rowPath.entries]}
                linesSubject={linesSubject}
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
