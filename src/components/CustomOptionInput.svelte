<script lang="ts">
  import settings from "../store/UserSettingsStore";

  export let label: string;
  export let placeholder: string;

  let value: number;

  function toCapitalice(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  $: value = $settings[label];

  function handleChange(e: any): void {
    value = e.target.value > 0 ? e.target.value : 0;
    settings.update((currentSettings) => {
      currentSettings[toCapitalice(label)] = value;
      return currentSettings;
    });
  }
</script>

<div class="flex flex-col items-start">
  <label class="block text-xs text-gray-500 pb-2" for={label}>
    {toCapitalice(label)}
  </label>
  <input
    class="appearance-none rounded text-xs w-full max-w-[7em] py-2 px-4 text-gray-700 leading-tight focus:outline-blue-500 focus:outline focus:outline-2"
    id={label}
    type="number"
    {placeholder}
    bind:value
    on:change={handleChange}
  />
</div>
