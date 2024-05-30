import { BehaviorSubject } from "rxjs";

export function readSync<T>(subject: BehaviorSubject<T>): T {
  let lastValue: T = null!;
  const subscription = subject.subscribe((value) => (lastValue = value));
  subscription.unsubscribe();
  return lastValue; // it's a BehaviorSubject we always get the value synchronously
}
