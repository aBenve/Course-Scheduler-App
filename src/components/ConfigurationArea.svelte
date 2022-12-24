<script lang="ts">
    import { fly } from "svelte/transition";
    import ConfigurationFavorite from "./ConfigurationFavorite.svelte";

    let clazz: string;
    export { clazz as class };
</script>

<div class={clazz}>
    <div
        in:fly={{ y: -10, duration: 500, delay: 500 }}
        class=" h-full rounded-2xl flex flex-col justify-end gap-y-5 colorTransition"
    >
        <ConfigurationFavorite />
    </div>
</div>
