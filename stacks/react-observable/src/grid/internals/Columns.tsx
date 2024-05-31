import { Fragment } from "react/jsx-runtime";
import { HeaderSpanLevel, probeCall } from "@reactivity-comparison/pivoting";
import Header from "./Header";
import { BehaviorSubject } from "rxjs";
import { useWatch } from "../../observables/useWatch";

type Props = {
  columnsSpansSubject: BehaviorSubject<HeaderSpanLevel[]>;
  rowsDepth: number;
};

export default function Columns(props: Props) {
  probeCall(Columns.name);
  const { columnsSpansSubject, rowsDepth } = props;
  const columnsSpans = useWatch(columnsSpansSubject);
  return (
    <>
      {columnsSpans.map((spanLevel, index) => (
        <Fragment key={index}>
          {spanLevel.map((span) => (
            <Header
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
