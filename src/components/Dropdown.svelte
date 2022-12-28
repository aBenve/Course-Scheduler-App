<script>
    import selectedPlanStore from "src/store/SelectedPlanStore";
    import Icon from "@iconify/svelte";
  import {createEventDispatcher} from "svelte";

    let isOpen = false;
    export let options;
    export let selectedOption;

    const onChange = createEventDispatcher();
</script>

<div
    class=" relative flex items-center bg-zone dark:bg-zone-dark w-fit colorTransition min-w-[5rem]  {isOpen
        ? 'rounded-b-none rounded-t-lg'
        : 'rounded-lg'}"
>
    <button
        on:click={() => {
            isOpen = !isOpen;
        }}
        class=" flex items-center justify-between space-x-2 px-3 py-2 text-text-dark dark:text-text text-sm  block w-full colorTransition"
        ><span>{selectedOption}</span>
        <Icon
            icon="material-symbols:keyboard-arrow-down-rounded"
            width="18"
            height="18"
            class="text-text-terciary {isOpen
                ? 'transform rotate-180 transition ease-int-out duration-300'
                : 'transform rotate-0 transition ease-int-out duration-300'}"
        /></button
    >
    {#if isOpen}
        <div
            class="flex pt-4 flex-col space-y-2 absolute w-full bg-area dark:bg-area-dark colorTransition  rounded-b-lg rounded-t-none  top-full left-0 "
        >
            {#each options as option}
                <button
                    on:click={() => {
                        selectedOption = option;
                        isOpen = false;
                        onChange('change', option);
                    }}
                    class="hover:bg-zone hover:dark:bg-zone-dark text-text-terciary hover:text-accent last:hover:rounded-b-lg text-sm py-1 px-2 block w-full  colorTransition"
                    >{option}</button
                >
            {/each}
        </div>
    {/if}
</div>
