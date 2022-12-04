<script lang="ts">
  import settings from "../store/UserSettingsStore";
  import RangeSlider from "svelte-range-slider-pips";
  import colorSettings from "../store/UserColorsStore";

  import config from "../../tailwind.config";

  console.log(config.theme.extend.colors);

  export let label: string;
  export let placeholder: string;
  export let max: number;
  export let text: string;
  /*let value: number;*/

  let colors = config.theme.extend.colors;

  function toCapitalice(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  $: value = $settings[label];

  /*
  function handleChange(e: any): void {
    let value = parseInt(e.target.value);
    value = value > 0 ? value : 0;
    settings.update((currentSettings) => {
      currentSettings[label] = value;
      console.log(currentSettings);
      return currentSettings;
    });
  }
  */
</script>

<!-- <div class="flex flex-col items-start w-full">
  <label
    class="block text-xs dark:text-text text-text-dark-secondary pb-2"
    for={label}
  >
    {toCapitalice(label)}
  </label>
  <input
    class="appearance-none rounded text-xs w-full max-w-[7em] py-2 px-4 text-text-dark-secondary bg-zone dark:text-text-secondary dark:bg-zone-dark leading-tight focus:outline-accent focus:outline focus:outline-2"
    id={label}
    type="number"
    {placeholder}
    bind:value={$settings[label]}
  />
</div> -->
<div class="flex flex-col">
  <div
    class="flex items-center space-x-2 pb-2 block text-xs dark:text-text text-text-dark-secondary "
  >
    <label class="" for={label}>
      {toCapitalice(text)}
    </label>
    <span class="px-2 py-1 bg-accent rounded-full bg-opacity-30 text-accent"
      >{value}</span
    >
  </div>
  <div
    style="{$colorSettings.colorMode !== 'dark'
      ? ` --range-slider: ${colors.background}; --range-handle-focus: ${colors.accent}; --range-handle: ${colors.accent}; --range-handle-inactive: ${colors['text-terciary']};`
      : ` --range-slider: ${colors['zone-dark']}; --range-handle-focus: ${colors.accent}; --range-handle: ${colors.accent}; --range-handle-inactive: ${colors['text-terciary']};`}  "
  >
    <!-- values prop deberia ser un array con el maximo y el minimo -->
    <RangeSlider range pushy bind:values={$settings[label]} min={0} {max} />
  </div>
</div>
