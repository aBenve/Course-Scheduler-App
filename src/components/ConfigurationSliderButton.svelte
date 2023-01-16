<script lang="ts">
    import CustomOptionInput from "./CustomOptionInput.svelte";

    export let onClick: () => void;
    export let isOpen = false;
    export let min_label: string;
    export let max_label: string;
    export let placeholder: string;
    export let max: number;
    export let min: number;
    export let sliderText: string;
    export let buttonText: string;
</script>

<div
    class="relative  md:static md:block flex flex-col gap-4 h-[3rem] w-full md:w-auto"
>
    <button
        on:click={() => onClick()}
        class="rounded-lg text-sm h-full py-3 px-4 bg-area dark:bg-area-dark hover:bg-zone dark:hover:bg-zone-dark text-text-dark-secondary dark:text-text-secondary  colorTransition"
    >
        {buttonText}
    </button>
    {#if isOpen}
        <div
            class="absolute shadow-xl md:w-[15rem] w-full z-30 mt-14 md:mt-2 bg-zone dark:bg-zone-dark p-4 rounded-lg colorTransition"
        >
            <CustomOptionInput
                {min_label}
                {max_label}
                {placeholder}
                {max}
                {min}
                text={sliderText}
            />
        </div>
    {/if}
</div>
