<script lang="ts">
  import Icon from "@iconify/svelte";
  export let title: string;
</script>

<div
  class="w-full flex items-center rounded-lg h-fit py-3 px-4 hover:bg-accent text-xs hover:bg-opacity-20
     text-text-dark dark:text-text-secondary dark:hover:bg-accent hover:text-accent  dark:hover:text-accent  font-medium dark:bg-opacity-30 hover:dark:bg-opacity-20"
>
  <Icon
    icon="material-symbols:drag-indicator"
    class="opacity-25"
    width={25}
    height={25}
  />
  <span class="ml-4 w-full"> {title} </span>
</div>
