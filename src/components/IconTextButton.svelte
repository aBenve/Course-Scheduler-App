<script>
    import Icon from "@iconify/svelte";

    export let icon;
    export let iconWidth;
    export let title = "";
    export let iconHeight;
    export let onClick = () => {};
</script>

<button
    on:click={() => {
        onClick();
    }}
    class="colorTransition bg-area dark:bg-area-dark flex space-x-2 items-center hover:bg-zone dark:hover:bg-zone-dark hover:bg-opacity-50 p-2 rounded-lg py-2 px-3"
>
    <Icon
        {icon}
        width={iconWidth}
        height={iconHeight}
        class="text-text-dark dark:text-text"
    />
    {#if title}
        <span class="text-text-dark dark:text-text text-xs">{title}</span>
    {/if}
</button>
