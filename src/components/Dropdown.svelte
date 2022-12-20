<script>
    import selectedPlanStore from "src/store/SelectedPlanStore";

    let isOpen = false;
    export let options;
    export let selectedOption;
    export let onChange;

    $: $selectedPlanStore = selectedOption;
</script>

<div
    class=" relative flex items-center bg-zone dark:bg-zone-dark w-fit px-3 py-2 colorTransition min-w-[5rem]  {isOpen
        ? 'rounded-b-none rounded-t-lg'
        : 'rounded-lg'}"
>
    <button
        on:click={() => {
            isOpen = !isOpen;
        }}
        class="bg-zone dark:bg-zone-dark text-text-dark dark:text-text text-sm  block w-full colorTransition"
        >{selectedOption}</button
    >
    {#if isOpen}
        <div
            class="flex pt-4 flex-col space-y-2 absolute w-full bg-area dark:bg-area-dark colorTransition bg-opacity-70 rounded-b-lg rounded-t-none  top-full left-0 "
        >
            {#each options as option}
                <button
                    on:click={() => {
                        selectedOption = option;
                        isOpen = false;
                        onChange(option);
                    }}
                    class="hover:bg-zone hover:dark:bg-zone-dark text-text-terciary hover:text-accent last:hover:rounded-b-lg text-sm py-1 px-2 block w-full  colorTransition"
                    >{option}</button
                >
            {/each}
        </div>
    {/if}
</div>
