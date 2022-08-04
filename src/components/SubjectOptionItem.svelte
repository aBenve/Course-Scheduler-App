<script lang="ts">
  import Tooltip from "./Tooltip.svelte";

  export let color: string;
  export let subject: string;
  export let commission: string;
  export let toggle: boolean;

  let tooltip = false;
</script>

<div
  class="rounded-lg flex items-center justify-between py-2 px-3 gap-2 relative text-text-dark dark:text-text"
  style="
    background-color: {toggle ? color + '20' : ''}; 
    color: {toggle ? color + 'ff' : ''};

  "
  on:mouseenter={() => (tooltip = true)}
  on:mouseleave={() => (tooltip = false)}
>
  <div>
    <svg height="10" width="10">
      <circle cx="5" cy="5" r="5" fill={color} />
    </svg>
  </div>
  <div class="flex flex-col max-w-[7em]">
    <div class="overflow-hidden">
      <div
        class="text-xs lg:text-sm fixed-line-height font-medium whitespace-nowrap {tooltip
          ? 'active'
          : 'overflow-x-hidden'}"
      >
        {subject}
      </div>
    </div>
    <span class="text-xxs sm:text-xs font-normal italic truncate opacity-70">
      commission: {commission}
    </span>
  </div>
  <!-- <Tooltip message={subject} toggle={tooltip} /> -->
</div>

<style>
  /* Workaround for jumping text */
  .fixed-line-height {
    line-height: 25px;
  }

  .active {
    display: inline-flex;
    animation: moveText 5s ease-in-out infinite;
  }

  @keyframes moveText {
    0% {
      transform: translateX(0%);
    }
    50% {
      transform: translateX(calc(-100% + 7em));
    }
    100% {
      transform: translateX(0%);
    }
  }
</style>
