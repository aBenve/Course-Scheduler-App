<script lang="ts">
    import SubjectsOptionsArea from "../components/SubjectsOptionsArea.svelte";
    import ControlsArea from "../components/ControlsArea.svelte";
    import IconButton from "./IconButton.svelte";

    let clazz: string;
    export { clazz as class };

    let optionsToggle: boolean = false;
    let controlsToggle: boolean = false;
</script>

<main class={clazz}>
    {#if optionsToggle}
        <div
            class="absolute bg-red-400 bg-opacity-50 w-full h-full inset-0 p-4"
        >
            <div
                on:click={() => (optionsToggle = false)}
                class="absolute bg-background dark:bg-background-dark bg-opacity-80 w-full h-full inset-0 "
            />
            <ControlsArea
                class="h-full w-[20rem] z-30"
                onToggle={() => {
                    optionsToggle = false;
                }}
            />
        </div>
    {:else if controlsToggle}
        <div
            class="absolute bg-red-400 bg-opacity-50 w-full h-full inset-0 p-4 flex item-center justify-end"
        >
            <div
                on:click={() => (controlsToggle = false)}
                class="absolute bg-background dark:bg-background-dark bg-opacity-80 w-full h-full inset-0 "
            />
            <SubjectsOptionsArea class="max-w-[20rem] z-30 h-full" />
        </div>
    {:else}
        <div class="flex items-center justify-between">
            <IconButton
                icon="mdi:chevron-double-right"
                onClick={() => (optionsToggle = true)}
                iconWidth="18"
                iconHeight="18"
            />
            <IconButton
                icon="mdi:chevron-double-left"
                onClick={() => (controlsToggle = true)}
                iconWidth="18"
                iconHeight="18"
            />
        </div>
    {/if}
</main>
