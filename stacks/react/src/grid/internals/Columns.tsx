import { Fragment } from "react/jsx-runtime";
import { HeaderSpanLevel, probeCall } from "@reactivity-comparison/pivoting";
import Header from "./Header";

type Props = {
  columnsSpans: HeaderSpanLevel[];
  rowsDepth: number;
};

export default function Columns(props: Props) {
  probeCall(Columns.name);
  const { columnsSpans, rowsDepth } = props;
  return (
    <>
      {columnsSpans.map((spanLevel, index) => (
        <Fragment key={index}>
          {spanLevel.map((span) => (
            <Header
              key={span.backingTree.offset}
              offsetX={span.backingTree.offset + rowsDepth}
              offsetY={index}
              sizeX={span.backingTree.size}
              sizeY={1}
              value={span.backingTree.value}
            />
          ))}
        </Fragment>
      ))}
    </>
  );
}
