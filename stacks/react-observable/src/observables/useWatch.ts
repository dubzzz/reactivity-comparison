import { useCallback, useSyncExternalStore } from "react";
import { BehaviorSubject } from "rxjs";
import { readSync } from "./readSync";

export function useWatch<T>(subject: BehaviorSubject<T>): T {
  const subscribe = useCallback(
    (onChange: () => void): (() => void) => {
      const subscription = subject.subscribe(onChange);
      return () => subscription.unsubscribe();
    },
    [subject]
  );
  const getSnapshot = useCallback(() => readSync(subject), [subject]);
  return useSyncExternalStore(subscribe, getSnapshot);
}
