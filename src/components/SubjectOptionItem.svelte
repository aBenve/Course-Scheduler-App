<script lang="ts">
  import { toggle_class } from "svelte/internal";
  import Tooltip from "./Tooltip.svelte";

  export let color: string;
  export let subject: string;
  export let commission: string;
  export let toggle: boolean;

  let tooltip = false;
</script>

<div
  class="rounded-lg flex items-center justify-between py-2 px-3 gap-2 relative "
  on:mouseenter={() => (tooltip = true)}
  on:mouseleave={() => (tooltip = false)}
>
  <div>
    <svg height="10" width="10">
      <circle cx="5" cy="5" r="5" fill={color} />
    </svg>
  </div>
  <div
    class="flex flex-col overflow-hidden max-w-[8em] {toggle
      ? 'text-white'
      : 'text-gray-800'}"
  >
    <span class="text-xs lg:text-sm font-medium truncate">
      {subject}
    </span>
    <span class="text-xxs sm:text-xs font-normal italic truncate">
      commission: {commission}
    </span>
  </div>
  <Tooltip message={subject} toggle={tooltip} />
</div>
