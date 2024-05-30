import { BehaviorSubject } from "rxjs";
import { usePipe } from "./usePipe";
import { readSync } from "./readSync";
import { useEffect } from "react";

export function useComputed<T, U>(
  transform: (value: T) => U,
  [subject]: [BehaviorSubject<T>]
): BehaviorSubject<U> {
  const [mappedSubject, setter] = usePipe(transform(readSync(subject)));
  useEffect(() => {
    const subscription = subject.subscribe((value) => setter(transform(value)));
    return () => subscription.unsubscribe();
  }, [subject, setter, transform]);
  return mappedSubject;
}
