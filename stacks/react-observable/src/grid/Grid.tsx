import { BehaviorSubject } from "rxjs";
import Cells from "./internals/Cells";
import Columns from "./internals/Columns";
import Rows from "./internals/Rows";
import {
  probeCall,
  HeaderId,
  Line,
  buildHeaders,
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
  const columnsDepth = useWatch(
    useComputed((columnsSpans) => columnsSpans.length, [columnsSpansSubject])
  );

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
  const rowsDepth = useWatch(
    useComputed((rowsSpans) => rowsSpans.length, [rowsSpansSubject])
  );

  return (
    <div>
      <Rows rowsSpansSubject={rowsSpansSubject} columnsDepth={columnsDepth} />
      <Columns
        columnsSpansSubject={columnsSpansSubject}
        rowsDepth={rowsDepth}
      />
      <Cells
        rowsPathsSubject={rowsPathsSubject}
        columnsPathsSubject={columnsPathsSubject}
        linesSubject={linesSubject}
        rowsDepth={rowsDepth}
        columnsDepth={columnsDepth}
      />
    </div>
  );
}
