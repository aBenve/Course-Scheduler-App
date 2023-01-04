<script>
    import Icon from "@iconify/svelte";

    export let icon;
    export let iconWidth;
    export let iconHeight;
    export let onClick = () => {};
</script>

<div
    class="p-2 bg-area rounded-lg dark:bg-area-dark text-text-dark dark:text-text cursor-pointer hover:opacity-50"
    on:click={() => {
        onClick();
    }}
>
    <Icon
        {icon}
        width={iconWidth}
        height={iconHeight}
        class="text-text-terciary"
    />
</div>
