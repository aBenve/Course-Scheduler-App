<script lang="ts">
  import Icon from "@iconify/svelte";
  export let title: string;
</script>

<div
  class="w-full flex items-center rounded-lg h-fit py-3 px-4 hover:bg-blue-100 text-xs
    hover:font-bold text-text-dark dark:text-text-secondary dark:hover:bg-blue-900 hover:text-blue-600  dark:hover:text-blue-400  font-medium"
>
  <Icon icon="material-symbols:drag-indicator" class="opacity-25" width={20} height={20}/>
  <span class="ml-4"> {title} </span>
</div>
