<script lang="ts">
  export let label: string;
  export let placeholder: string;
  export let value = 0;

  function handleChange(e: any): void {
    value = e.target.value > 0 ? e.target.value : 0;
    console.log(value);
  }
</script>

<div class="flex flex-col w-full items-start">
  <label class="block text-xs text-gray-500 pb-2" for={label}>
    {label}
  </label>
  <input
    class="appearance-none rounded text-xs w-24  py-2 px-4 text-gray-700 leading-tight "
    id={label}
    type="number"
    {placeholder}
    bind:value
    on:change={handleChange}
  />
</div>
