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
  <textarea
    rows="6"
    class="resize-none  appearance-none rounded text-sm w-full py-2 px-4 text-gray-700 leading-tight focus:outline-blue-500 focus:outline focus:outline-2 "
    id={label}
    {type}
    {placeholder}
  />
</div>
