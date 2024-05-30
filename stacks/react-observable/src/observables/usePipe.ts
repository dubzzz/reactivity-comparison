import { isEqual } from "lodash";
import { useState } from "react";
import { BehaviorSubject } from "rxjs";
import { readSync } from "./readSync";

export function usePipe<T>(
  initialValue: T
): [value: BehaviorSubject<T>, setter: (nextValue: T) => void] {
  const [value] = useState(() => new BehaviorSubject(initialValue));
  const [setter] = useState(() => (nextValue: T) => {
    if (!isEqual(nextValue, readSync(value))) {
      value.next(nextValue);
    }
  });
  return [value, setter];
}
