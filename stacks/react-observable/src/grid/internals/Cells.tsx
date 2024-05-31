import { Line, Path, probeCall } from "@reactivity-comparison/pivoting";
import { BehaviorSubject } from "rxjs";
import CellsColumn from "./CellsColumn";
import { useWatch } from "../../observables/useWatch";

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
          <CellsColumn
            key={columnPath.offset}
            pathRows={rowsPaths}
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
