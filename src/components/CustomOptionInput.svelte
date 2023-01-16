<script lang="ts">
  import settings from "../store/UserSettingsStore";
  import RangeSlider from "svelte-range-slider-pips";
  import colorSettings from "../store/UserColorsStore";

  import config from "../../tailwind.config";
  import { minBy } from "lodash";
  import { detach } from "svelte/internal";

  export let min_label: string;
  export let max_label: string;
  export let placeholder: string;
  export let max: number;
  export let min: number;
  export let text: string;

  let colors = config.theme.extend.colors;

  function toCapitalice(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
</script>

<div class="flex flex-col">
  <div
    class="flex items-center space-x-2 pb-2 block text-xs dark:text-text text-text-dark-secondary colorTransition"
  >
    <label class="" for={text}>
      {toCapitalice(text)}
    </label>
    {#if min_label === max_label}
      <span class="px-2 py-1 bg-accent rounded-lg bg-opacity-30 text-accent"
        >{$settings[min_label]}</span
      >
    {:else}
      <span class="px-2 py-1 bg-accent rounded-lg bg-opacity-30 text-accent"
        >{$settings[min_label]} - {$settings[max_label]}</span
      >
    {/if}
  </div>
  <div
    style="{$colorSettings.colorMode !== 'dark'
      ? ` --range-slider: ${colors.background}; --range-handle-focus: ${colors.accent}; --range-handle: ${colors.accent}; --range-handle-inactive: ${colors['text-terciary']};`
      : ` --range-slider: ${colors['area-dark']}; --range-handle-focus: ${colors.accent}; --range-handle: ${colors.accent}; --range-handle-inactive: ${colors['text-terciary']};`}  "
  >
    <RangeSlider
      range={min_label === max_label ? false : true}
      pushy
      values={[$settings[min_label], $settings[max_label]]}
      on:change={(e) => {
        $settings[[min_label, max_label][e.detail?.activeHandle]] =
          e.detail.value;
      }}
      {min}
      {max}
    />
  </div>
</div>
