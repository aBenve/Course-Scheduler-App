<!-- <script lang="ts">
  import Icon from "@iconify/svelte";
  export let title: string;
</script>

<div
  class="w-full flex items-center rounded-lg h-fit py-3 px-4 hover:bg-accent text-xs hover:bg-opacity-20 transition-hover duration-300 ease-in-out
     text-text-dark dark:text-text-secondary dark:hover:bg-accent hover:text-accent  dark:hover:text-accent  font-medium dark:bg-opacity-30 hover:dark:bg-opacity-20"
>
  <Icon
    icon="material-symbols:drag-indicator"
    class="opacity-30 hover:text-accent"
    width={25}
    height={25}
  />
  <span class="ml-4 w-full "> {title} </span>
</div> -->
<script lang="ts">
  import Icon from "@iconify/svelte";

  // import tailwind config
  import tailwindConfig from "../../tailwind.config.js";

  export let onChange;
  export let title: string;
  export let id: string;
  export let importance: string;
</script>

<div
  class="group flex items-center space-x-4 rounded-lg  justify-between colorTransition p-2 {importance ===
  'mandatory'
    ? // ? 'border border-solid border-accent border-2 text-text-dark dark:text-text'
      'bg-accent text-area '
    : importance === 'optional'
    ? 'bg-zone dark:bg-zone-dark text-text-dark dark:text-text'
    : 'bg-zone dark:bg-zone-dark text-vertex dark:text-vertex-dark'} "
>
  <button
    on:click={() => {
      if (importance !== "ignore") onChange(id, importance, "ignore");
      else onChange(id, importance, "optional");
    }}
    class="opacity-0 group-hover:opacity-100 transition ease-in-out duration-300 rounded-lg p-2 hover:bg-zone-secondary hover:dark:bg-zone-secondary-dark hover:bg-opacity-50"
  >
    <Icon
      icon="material-symbols:do-not-disturb-on-outline-rounded"
      class=""
      width={18}
      height={18}
    />
  </button>
  <span class=" text-xs flex items-start w-full">{title}</span>
  <button
    on:click={() => {
      if (importance !== "mandatory") onChange(id, importance, "mandatory");
      else onChange(id, importance, "optional");
    }}
    class="opacity-0 group-hover:opacity-100 transition ease-in-out duration-300 rounded-lg p-2 hover:bg-zone-secondary hover:dark:bg-zone-secondary-dark hover:bg-opacity-50"
  >
    <Icon
      icon="material-symbols:lock-open-outline"
      class=""
      width={18}
      height={18}
    />
  </button>
</div>

<style>
</style>
