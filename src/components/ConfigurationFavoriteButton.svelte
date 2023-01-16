<script lang="ts">
  import Icon from "@iconify/svelte";

  export let content = null;
  export let onClick = () => {};
  export let icon = "";
  export let selected: boolean;
</script>

<button
  on:click={() => onClick()}
  class="colorTransition rounded-lg {selected
    ? 'bg-accent text-accent bg-opacity-30 hover:bg-opacity-50'
    : 'bg-area dark:bg-area-dark hover:bg-zone dark:hover:bg-zone-dark text-text-dark-secondary dark:text-text-secondary'}   min-w-[3rem] min-h-[3rem] flex items-center justify-center"
>
  {#if icon !== ""}
    <Icon {icon} width={20} height={20} />
  {:else}
    {content}
  {/if}
</button>
