import { Fragment } from "react/jsx-runtime";
import { HeaderTree, probeCall } from "@reactivity-comparison/pivoting";
import Header from "./Header";

type Props = {
  rows: HeaderTree[];
  offset: number;
  columnsDepth: number;
};

export default function Rows(props: Props) {
  probeCall(Rows.name);
  const { rows, offset, columnsDepth } = props;
  return (
    <>
      {rows.map((row) => (
        <Fragment key={row.value}>
          <Header
            offsetX={offset}
            offsetY={row.offset + columnsDepth}
            sizeX={1}
            sizeY={row.size}
            value={row.value}
          />
          <Rows
            rows={row.children}
            offset={offset + 1}
            columnsDepth={columnsDepth}
          />
        </Fragment>
      ))}
    </>
  );
}
