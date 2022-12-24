<script>
    import Icon from "@iconify/svelte";

    export let prevImportance;
    export let forImportance;
    export let onChange;
    export let id;
    export let icon;
    export let clickedIcon;
    export let tooltip;
</script>

<div class="relative group">
    <button
        on:click={() => {
            onChange(id, prevImportance);
        }}
        class="colorTransition rounded-lg p-2 {prevImportance === 'mandatory'
            ? 'text-accent hover:bg-accent hover:bg-opacity-20'
            : prevImportance === 'optional'
            ? 'hover:bg-opacity-60  text-text-dark dark:text-text hover:bg-zone-secondary dark:hover:bg-zone-secondary-dark '
            : 'hover:bg-opacity-60  hover:bg-zone-secondary dark:hover:bg-zone-secondary-dark text-vertex dark:text-vertex-dark'}"
    >
        {#if prevImportance === forImportance}
            <Icon icon={clickedIcon} class="" width={18} height={18} />
        {:else}
            <Icon {icon} class="" width={18} height={18} />
        {/if}
    </button>
    <!-- this is a tooltip -->
    <div
        class="hidden z-10 text-xs group-hover:block fixed px-3 py-2 rounded-lg text-vertex bg-background-dark w-22 transition ease-in-out duration-100"
    >
        {tooltip}
    </div>
</div>
