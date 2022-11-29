<script lang="ts">
  export let label: string;
  export let type: string;
  export let placeholder: string;
</script>

<div class="flex flex-col w-full items-start">
  <label
    class="block text-sm dark:text-text text-text-dark  pb-2 font-bold pointer-events-none"
    for={label}
  >
    {label}
  </label>
  <textarea
    rows="6"
    class="resize-none  appearance-none rounded text-sm w-full py-2 px-4 text-text-dark dark:text-text-secondary bg-zone dark:bg-zone-dark leading-tight focus:outline-accent focus:outline focus:outline-2 "
    id={label}
    {type}
    {placeholder}
  />
</div>
