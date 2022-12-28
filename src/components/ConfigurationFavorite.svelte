<script>
  import Icon from "@iconify/svelte";
  import ConfigurationFavoriteButton from "./ConfigurationFavoriteButton.svelte";
  import favoriteOptions from "../store/FavoriteOptionsStore";
  import { selectedOption } from "../store/SelectedOptionStore";
  import { selectedFavouriteOptionIndex } from "../store/SelectedOptionIndices";
</script>

<div class="flex  items-center space-x-2 overflow-x-auto ">
  {#each $favoriteOptions as option, i}
    <ConfigurationFavoriteButton
      content={i + 1}
      onClick={() => {
        selectedFavouriteOptionIndex.next(i);
      }}
    />
  {/each}
  <ConfigurationFavoriteButton
    icon="material-symbols:add-rounded"
    onClick={() =>
      $selectedOption !== null
        ? favoriteOptions.addFavoriteOption($selectedOption)
        : null}
  />
</div>
