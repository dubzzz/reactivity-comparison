import { useCallback, useSyncExternalStore } from "react";
import { BehaviorSubject } from "rxjs";

export function useWatch<T>(subject: BehaviorSubject<T>): T {
  const subscribe = useCallback(
    (onChange: () => void): (() => void) => {
      const subscription = subject.subscribe(onChange);
      return () => subscription.unsubscribe();
    },
    [subject]
  );
  const getSnapshot = useCallback(() => {
    let lastValue: T = null!;
    const subscription = subject.subscribe((value) => (lastValue = value));
    subscription.unsubscribe();
    return lastValue; // it's a BehaviorSubject we always get the value synchronously
  }, [subject]);
  return useSyncExternalStore(subscribe, getSnapshot);
}
