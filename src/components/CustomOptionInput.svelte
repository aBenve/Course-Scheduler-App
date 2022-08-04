<script lang="ts">
  import settings from "../store/UserSettingsStore";

  export let label: string;
  export let placeholder: string;

  /*let value: number;*/

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

<div class="flex flex-col items-start">
  <label
    class="block text-xs dark:text-text text-text-dark-secondary pb-2"
    for={label}
  >
    {toCapitalice(label)}
  </label>
  <input
    class="appearance-none rounded text-xs w-full max-w-[7em] py-2 px-4 text-text-dark-secondary bg-zone dark:text-text-secondary dark:bg-zone-dark leading-tight focus:outline-blue-500 focus:outline focus:outline-2"
    id={label}
    type="number"
    {placeholder}
    bind:value={$settings[label]}
  />
</div>
