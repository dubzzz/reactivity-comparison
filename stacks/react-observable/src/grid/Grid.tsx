import { BehaviorSubject } from "rxjs";
import Cells from "./internals/Cells";
import Columns from "./internals/Columns";
import Rows from "./internals/Rows";
import {
  probeCall,
  HeaderId,
  Line,
  buildHeaders,
  computeGridDimensions,
  extractHeaderSpans,
  extractPathsFromSpans,
} from "@reactivity-comparison/pivoting";
import { useComputed } from "../observables/useComputed";
import { useWatch } from "../observables/useWatch";

type Props = {
  linesSubject: BehaviorSubject<Line[]>;
  columnHeaderIds: HeaderId[];
  rowHeaderIds: HeaderId[];
};

export default function Grid(props: Props) {
  probeCall(Grid.name);
  const { linesSubject, columnHeaderIds, rowHeaderIds } = props;

  const columnsHeadersSubject = useComputed(
    (lines) => buildHeaders(lines, columnHeaderIds, 0),
    [linesSubject]
  );
  const columnsSpansSubject = useComputed(extractHeaderSpans, [
    columnsHeadersSubject,
  ]);
  const columnsPathsSubject = useComputed(extractPathsFromSpans, [
    columnsSpansSubject,
  ]);
  const columns = useWatch(columnsHeadersSubject);

  const rowsHeadersSubject = useComputed(
    (lines) => buildHeaders(lines, rowHeaderIds, 0),
    [linesSubject]
  );
  const rowsSpansSubject = useComputed(extractHeaderSpans, [
    rowsHeadersSubject,
  ]);
  const rowsPathsSubject = useComputed(extractPathsFromSpans, [
    rowsSpansSubject,
  ]);
  const rows = useWatch(rowsHeadersSubject);

  const { columnsDepth, rowsDepth } = computeGridDimensions(columns, rows);

  return (
    <div>
      <Rows rowsSpansSubject={rowsSpansSubject} columnsDepth={columnsDepth} />
      <Columns
        columnsSpansSubject={columnsSpansSubject}
        rowsDepth={rowsDepth}
      />
      <Cells
        rows={rows}
        columns={columns}
        linesSubject={linesSubject}
        rowsDepth={rowsDepth}
        columnsDepth={columnsDepth}
      />
    </div>
  );
}
