<script lang="ts">
  import colorSettings from "../store/UserColorsStore";

  export let color: string;
  export let subject: string;
  export let commission: string;
  export let toggle: boolean;

  let tooltip = false;
</script>

<div
  class="rounded-lg flex items-center justify-between px-2 gap-2 relative text-text-dark dark:text-text colorTransition"
  style="
    background-color: {toggle
    ? $colorSettings.colorMode == 'dark'
      ? color + '30'
      : color + '20'
    : ''}; 
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
  <div class="flex max-w-[12em]">
    <div class="overflow-hidden">
      <div
        class="text-xs py-1.5 font-medium whitespace-nowrap {tooltip
          ? 'active'
          : 'overflow-x-hidden'}"
      >
        {subject}
      </div>
    </div>
  </div>
  <span
    class="text-xs  font-normal colorTransition {toggle
      ? ''
      : 'text-text-dark dark:text-text opacity-80'}"
  >
    {commission}
  </span>
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
      transform: translateX(
        min(calc(-100% + 15em), 0%)
      ); /** 15 seems to be a better number than 12*/
    }
    100% {
      transform: translateX(0%);
    }
  }
</style>
