import { Fragment } from "react/jsx-runtime";
import { HeaderSpanLevel, probeCall } from "@reactivity-comparison/pivoting";
import Header from "./Header";

type Props = {
  rowsSpans: HeaderSpanLevel[];
  columnsDepth: number;
};

export default function Rows(props: Props) {
  probeCall(Rows.name);
  const { rowsSpans, columnsDepth } = props;
  return (
    <>
      {rowsSpans.map((spanLevel, index) => (
        <Fragment key={index}>
          {spanLevel.map((span) => (
            <Header
              key={span.backingTree.offset}
              offsetX={index}
              offsetY={span.backingTree.offset + columnsDepth}
              sizeX={1}
              sizeY={span.backingTree.size}
              value={span.backingTree.value}
            />
          ))}
        </Fragment>
      ))}
    </>
  );
}
