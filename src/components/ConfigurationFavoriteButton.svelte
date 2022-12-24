<script>
    import Icon from "@iconify/svelte";

    export let content = null;
    export let onClick = () => {};
    export let icon = "";
</script>

<button
    on:click={() => onClick()}
    class="colorTransition rounded-lg  bg-area dark:bg-area-dark hover:bg-zone dark:hover:bg-zone-dark hover:bg-opacity-50 text-text-dark-secondary dark:text-text-secondary min-w-[3rem] min-h-[3rem] flex items-center justify-center"
>
    {#if icon !== ""}
        <Icon {icon} width={20} height={20} />
    {:else}
        {content}
    {/if}
</button>
