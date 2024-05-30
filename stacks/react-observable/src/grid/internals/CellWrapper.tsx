import {
  Line,
  Path,
  computeValue,
  probeCall,
} from "@reactivity-comparison/pivoting";
import Cell from "./Cell";
import { BehaviorSubject } from "rxjs";
import { useWatch } from "../../observables/useWatch";
import { useComputed } from "../../observables/useComputed";
import { useCallback } from "react";

type Props = {
  entries: Path["entries"];
  linesSubject: BehaviorSubject<Line[]>;
  offsetX: number;
  offsetY: number;
};

export default function CellsWrapper(props: Props) {
  probeCall(CellsWrapper.name);
  const { entries, linesSubject, offsetX, offsetY } = props;
  const valueCallback = useCallback(
    (lines: Line[]) => computeValue(entries, lines),
    [entries]
  );
  const valueSubject = useComputed(valueCallback, [linesSubject]);
  const value = useWatch(valueSubject);
  return <Cell value={value} offsetX={offsetX} offsetY={offsetY} />;
}
