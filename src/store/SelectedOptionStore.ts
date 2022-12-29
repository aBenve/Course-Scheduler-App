import { combineLatestWith, map, shareReplay, zip } from "rxjs";
import favoriteOptions from "./FavoriteOptionsStore";
import { options } from "./OptionStore";
import {
  selectedFavouriteOptionIndex,
  selectedOptionIndex,
} from "./SelectedOptionIndices";
import { toObservable } from "./utils";

export const selectedOption = zip([
  selectedOptionIndex,
  selectedFavouriteOptionIndex,
]).pipe(
  combineLatestWith(options),
  combineLatestWith(toObservable(favoriteOptions)),
  map(([[[optionIndex, favouriteOptionIndex], options], favoriteOptions]) =>
    optionIndex !== null
      ? options.values[optionIndex]
      : favouriteOptionIndex !== null
      ? favoriteOptions[favouriteOptionIndex]
      : null
  ),
  shareReplay(1)
);
