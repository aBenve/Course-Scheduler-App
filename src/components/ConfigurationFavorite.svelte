<script>
    import Icon from "@iconify/svelte";
    import ConfigurationFavoriteButton from "./ConfigurationFavoriteButton.svelte";
    import favoriteOptions from "../store/FavoriteOptionsStore";
    import selectedOption from "../store/SelectedOptionStore";
    import { options } from "../store/OptionStore";

    $: option =
        selectedOption == null ? null : $options.values[$selectedOption];
</script>

<div class="flex  items-center space-x-2 overflow-x-auto ">
    {#each $favoriteOptions as option, i}
        <ConfigurationFavoriteButton content={i} onClick={() => {}} />
    {/each}
    <ConfigurationFavoriteButton
        icon="material-symbols:add-rounded"
        onClick={() =>
            option !== null && option !== undefined
                ? favoriteOptions.addFavoriteOption(option)
                : null}
    />
</div>
