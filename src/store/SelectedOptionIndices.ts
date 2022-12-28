import { BehaviorSubject } from "rxjs";

export const selectedOptionIndex = new BehaviorSubject<number | null>(null);
export const selectedFavouriteOptionIndex = new BehaviorSubject<number | null>(
  null
);

selectedOptionIndex.subscribe((v) => {
  if (v !== null) {
    selectedFavouriteOptionIndex.next(null);
  }
});

selectedFavouriteOptionIndex.subscribe((v) => {
  if (v !== null) {
    selectedOptionIndex.next(null);
  }
});

export function resetSelectedOption() {
  const value = selectedFavouriteOptionIndex.getValue();
  if (value === null) {
    selectedOptionIndex.next(null);
  }
  selectedFavouriteOptionIndex.next(value);
}
