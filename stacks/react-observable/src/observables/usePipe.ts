import { useState } from "react";
import { BehaviorSubject } from "rxjs";

export function usePipe<T>(
  initialValue: T
): [value: BehaviorSubject<T>, setter: (nextValue: T) => void] {
  const [value] = useState(() => new BehaviorSubject(initialValue));
  const [setter] = useState(() => (nextValue: T) => value.next(nextValue));
  return [value, setter];
}
