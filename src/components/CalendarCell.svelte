<script>
    import { bubble } from "svelte/internal";

    export let col;
    export let row;
    export let bgColor;

    let isActive = false;
</script>

<div
    on:click={() => (isActive = !isActive)}
    on:mouseenter={(e) => (e.buttons === 1 ? (isActive = true) : null)}
    class=" col-start-{col} row-start-{row} col-span-1 hover:opacity-50 {isActive
        ? 'bg-accent'
        : bgColor} colorTransition"
/>
