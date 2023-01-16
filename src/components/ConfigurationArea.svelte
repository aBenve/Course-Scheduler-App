<script lang="ts">
  import { fly } from "svelte/transition";
  import ConfigurationFavoriteButton from "./ConfigurationFavoriteButton.svelte";
  import favoriteOptions from "../store/FavoriteOptionsStore";
  import { selectedOption } from "../store/SelectedOptionStore";
  import { selectedFavouriteOptionIndex } from "../store/SelectedOptionIndices";
  import ConfigurationSliderButtonList from "./ConfigurationSliderButtonList.svelte";
  let clazz: string;
  export { clazz as class };
</script>

<div class={clazz}>
  <div
    in:fly={{ y: -10, duration: 500, delay: 500 }}
    class=" h-full w-full colorTransition"
  >
    <div class="flex flex-col gap-4 w-full ">
      <ConfigurationSliderButtonList />

      <div class="flex w-full items-center gap-2 ">
        {#if $favoriteOptions.length > 0}
          <div class="flex items-center gap-2 overflow-x-auto max-w-max">
            {#each $favoriteOptions as option, i}
              <ConfigurationFavoriteButton
                content={i + 1}
                selected={$selectedFavouriteOptionIndex === i}
                onClick={() => {
                  selectedFavouriteOptionIndex.next(i);
                }}
              />
            {/each}
          </div>
        {/if}

        <ConfigurationFavoriteButton
          icon="material-symbols:add-rounded"
          selected={false}
          onClick={() =>
            $selectedOption !== null
              ? favoriteOptions.addFavoriteOption($selectedOption)
              : null}
        />
      </div>
    </div>
  </div>
</div>
