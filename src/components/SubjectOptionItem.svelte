<script lang="ts">
  import Tooltip from "./Tooltip.svelte";

  export let color: string;
  export let subject: string;
  export let commission: string;
  export let toggle: boolean;

  let tooltip = false;
</script>

<div
  class="rounded-lg flex items-center justify-between py-2 px-3 gap-2 relative "
  style="
    background-color: {toggle ? color + '20' : color + '00'}; 
    color: {toggle ? color + 'ff' : '#212121'};

  "
  on:mouseenter={() => (tooltip = true)}
  on:mouseleave={() => (tooltip = false)}
>
  <div>
    <svg height="10" width="10">
      <circle cx="5" cy="5" r="5" fill={color} />
    </svg>
  </div>
  <div class="flex flex-col overflow-hidden max-w-[7em]">
    <div
      class="text-xs lg:text-sm font-medium {tooltip ? 'active' : 'truncate'}"
    >
      {subject}
    </div>
    <span class="text-xxs sm:text-xs font-normal italic truncate">
      commission: {commission}
    </span>
  </div>
  <!-- <Tooltip message={subject} toggle={tooltip} /> -->
</div>

<style>
  .active {
    text-overflow: clip;
    white-space: nowrap;
    animation: moveText 5s ease-in-out infinite;
  }
  @keyframes moveText {
    0% {
      transform: translateX(0%);
    }
    50% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
</style>
