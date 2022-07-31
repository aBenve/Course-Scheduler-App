<script lang="ts">
  export let message: string;
  export let toggle: boolean;
</script>

<div
  class="absolute -top-10 rounded-md flex-col items-center text-sm py-2 px-3 font-medium mb-6 bg-gray-600 z-30 {toggle
    ? 'visible'
    : 'hidden'}"
>
  {message}
  <!-- <div class="w-3 h-3 -mb-0.5 ml-2 rotate-45 bg-gray-600" /> -->
</div>
