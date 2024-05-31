import Cells from "./internals/Cells";
import Columns from "./internals/Columns";
import Rows from "./internals/Rows";
import {
  probeCall,
  HeaderId,
  Line,
  buildHeaders,
  extractHeaderSpans,
} from "@reactivity-comparison/pivoting";

type Props = {
  lines: Line[];
  columnHeaderIds: HeaderId[];
  rowHeaderIds: HeaderId[];
};

export default function Grid(props: Props) {
  probeCall(Grid.name);
  const { lines, columnHeaderIds, rowHeaderIds } = props;

  const columnsHeaders = buildHeaders(lines, columnHeaderIds, 0);
  const columnsSpans = extractHeaderSpans(columnsHeaders);

  const rowsHeaders = buildHeaders(lines, rowHeaderIds, 0);
  const rowsSpans = extractHeaderSpans(rowsHeaders);

  return (
    <div>
      <Rows rowsSpans={rowsSpans} columnsDepth={columnsSpans.length} />
      <Columns columnsSpans={columnsSpans} rowsDepth={rowsSpans.length} />
      <Cells
        rows={rowsHeaders}
        columns={columnsHeaders}
        lines={lines}
        rowsDepth={rowsSpans.length}
        columnsDepth={columnsSpans.length}
      />
    </div>
  );
}
