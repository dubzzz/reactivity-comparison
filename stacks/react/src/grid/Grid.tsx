import Cells from "./internals/Cells";
import Columns from "./internals/Columns";
import Rows from "./internals/Rows";
import {
  probeCall,
  HeaderId,
  Line,
  buildHeaders,
  computeGridDimensions,
} from "@reactivity-comparison/pivoting";

type Props = {
  lines: Line[];
  columnHeaderIds: HeaderId[];
  rowHeaderIds: HeaderId[];
};

export default function Grid(props: Props) {
  probeCall(Grid.name);
  const { lines, columnHeaderIds, rowHeaderIds } = props;
  const columns = buildHeaders(lines, columnHeaderIds, 0);
  const rows = buildHeaders(lines, rowHeaderIds, 0);
  const { columnsDepth, rowsDepth } = computeGridDimensions(columns, rows);

  return (
    <div>
      <Rows rows={rows} offset={0} columnsDepth={columnsDepth} />
      <Columns columns={columns} offset={0} rowsDepth={rowsDepth} />
      <Cells
        rows={rows}
        columns={columns}
        lines={lines}
        rowsDepth={rowsDepth}
        columnsDepth={columnsDepth}
      />
    </div>
  );
}
