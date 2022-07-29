<script lang="ts">
  export let color: string;
  export let subject: string;
  export let commission: string;

  let Toggle = false;
</script>

<div
  class="bg-blue-800 rounded-lg flex items-center justify-between py-2 px-3 gap-2 hover:bg-lime-400"
  on:mouseenter={() => (Toggle = true)}
  on:mouseleave={() => (Toggle = false)}
>
  <div>
    <svg height="10" width="10">
      <circle cx="5" cy="5" r="5" fill={color} />
    </svg>
  </div>
  <div
    class="flex flex-col overflow-hidden {Toggle
      ? 'max-w-[fit]'
      : 'max-w-[8em]'}"
  >
    <span class="text-xs sm:text-sm font-medium truncate">
      {subject}
    </span>
    <span class="text-xxs sm:text-xs font-normal italic truncate">
      commission: {commission}
    </span>
  </div>
</div>
