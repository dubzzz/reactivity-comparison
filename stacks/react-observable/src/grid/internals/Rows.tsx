import { Fragment } from "react/jsx-runtime";
import { HeaderSpanLevel, probeCall } from "@reactivity-comparison/pivoting";
import Header from "./Header";
import { BehaviorSubject } from "rxjs";
import { useWatch } from "../../observables/useWatch";

type Props = {
  rowsSpansSubject: BehaviorSubject<HeaderSpanLevel[]>;
  columnsDepth: number;
};

export default function Rows(props: Props) {
  probeCall(Rows.name);
  const { rowsSpansSubject, columnsDepth } = props;
  const rowsSpans = useWatch(rowsSpansSubject);
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
