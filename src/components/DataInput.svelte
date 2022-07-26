<script lang="ts">
  export let label: string;
  export let type: string;
  export let placeholder: string;
</script>

<div class="flex flex-col w-full items-start">
  <label
    class="block text-sm text-gray-500 pb-2 font-bold pointer-events-none"
    for={label}
  >
    {label}
  </label>
  <input
    class="appearance-none rounded text-sm w-full py-2 px-4 text-gray-700 leading-tight "
    id={label}
    {type}
    {placeholder}
  />
</div>
