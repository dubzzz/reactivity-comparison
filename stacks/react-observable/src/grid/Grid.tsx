import { BehaviorSubject } from "rxjs";
import Cells from "./internals/Cells";
import Columns from "./internals/Columns";
import Rows from "./internals/Rows";
import {
  probeCall,
  HeaderId,
  Line,
  LineHeaders,
  buildHeaders,
  computeGridDimensions,
} from "@reactivity-comparison/pivoting";
import { useComputed } from "../observables/useComputed";
import { useWatch } from "../observables/useWatch";
import { useCallback } from "react";

type Props = {
  linesSubject: BehaviorSubject<Line[]>;
  columnHeaderIds: HeaderId[];
  rowHeaderIds: HeaderId[];
};

export default function Grid(props: Props) {
  probeCall(Grid.name);
  const { linesSubject, columnHeaderIds, rowHeaderIds } = props;

  const columnsCallback = useCallback(
    (lines: Line[]) => buildHeaders(lines, columnHeaderIds, 0),
    [columnHeaderIds]
  );
  const columnsSubject = useComputed(columnsCallback, [linesSubject]);
  const columns = useWatch(columnsSubject);

  const rowsCallback = useCallback(
    (lines: Line[]) => buildHeaders(lines, rowHeaderIds, 0),
    [rowHeaderIds]
  );
  const rowsSubject = useComputed(rowsCallback, [linesSubject]);
  const rows = useWatch(rowsSubject);

  const { columnsDepth, rowsDepth } = computeGridDimensions(columns, rows);

  return (
    <div>
      <Rows rows={rows} offset={0} columnsDepth={columnsDepth} />
      <Columns columns={columns} offset={0} rowsDepth={rowsDepth} />
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

// eslint-disable-next-line react-refresh/only-export-components
export function toHeaders(headers: Record<string, string>): LineHeaders {
  return headers as LineHeaders;
}

// eslint-disable-next-line react-refresh/only-export-components
export function toHeaderId(headerId: string): HeaderId {
  return headerId as HeaderId;
}
