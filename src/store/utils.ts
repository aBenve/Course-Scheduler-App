import { Observable, tap } from "rxjs";
import type { Readable } from "svelte/store";

export function toObservable<T>(store: Readable<T>): Observable<T> {
  return new Observable((observer) => store.subscribe((v) => observer.next(v)));
}

export const debug = (message: string) => (source: Observable<any>) =>
  source.pipe(
    tap((val) => {
      console.log(message + ": ", val);
    })
  );
