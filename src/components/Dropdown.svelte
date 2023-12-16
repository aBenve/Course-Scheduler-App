<script>
  import Icon from "@iconify/svelte";
  import { createEventDispatcher } from "svelte";

  export let options;
  export let selectedOption;
  export let inverted = false;
  export let optionToString = o => o;

  const onChange = createEventDispatcher();
</script>

<div
  class="group relative flex items-center bg-zone dark:bg-zone-dark w-fit colorTransition min-w-[5rem] {inverted ? 'focus-within:rounded-t-none focus-within:rounded-b-lg' : 'focus-within:rounded-b-none focus-within:rounded-t-lg'} rounded-lg"
>
  <button
    class="group flex items-center justify-between space-x-2 px-3 py-2 text-text-dark dark:text-text text-sm  block w-full colorTransition"
    ><span>{optionToString(selectedOption)}</span>
    <Icon
      icon="material-symbols:keyboard-arrow-down-rounded"
      width="18"
      height="18"
      class="text-text-terciary group-focus-within::transform group-focus-within::rotate-180 group-focus-within::transition group-focus-within::ease-int-out group-focus-within::duration-300 transform rotate-0 transition ease-int-out duration-300"
    /></button
  >
  <div
    class="invisible group-focus-within:visible flex flex-col space-y-2 absolute w-full bg-area dark:bg-area-dark colorTransition {inverted ? 'bottom-full rounded-t-lg rounded-b-none pb-2' : 'top-full rounded-b-lg rounded-t-none pt-2'} left-0 "
  >
    {#each options as option}
      <button
        on:click={() => {
          selectedOption = option;
          onChange("change", option);
        }}
        class="hover:bg-zone hover:dark:bg-zone-dark text-text-terciary hover:text-accent {inverted ? 'first:hover:rounded-t-lg' : 'last:hover:rounded-b-lg'} text-sm py-1 px-2 block w-full  colorTransition"
        >{optionToString(option)}</button
      >
    {/each}
  </div>
</div>
