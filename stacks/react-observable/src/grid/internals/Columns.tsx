import { Fragment } from "react/jsx-runtime";
import { HeaderTree, probeCall } from "@reactivity-comparison/pivoting";
import Header from "./Header";

type Props = {
  columns: HeaderTree[];
  offset: number;
  rowsDepth: number;
};

export default function Columns(props: Props) {
  probeCall(Columns.name);
  const { columns, offset, rowsDepth } = props;
  return (
    <>
      {columns.map((column) => (
        <Fragment key={column.value}>
          <Header
            offsetX={column.offset + rowsDepth}
            offsetY={offset}
            sizeX={column.size}
            sizeY={1}
            value={column.value}
          />
          <Columns
            columns={column.children}
            offset={offset + 1}
            rowsDepth={rowsDepth}
          />
        </Fragment>
      ))}
    </>
  );
}
