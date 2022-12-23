<script>
  import Icon from "@iconify/svelte";
  import colorSettings from "../store/UserColorsStore";

  let clazz;

  function handleColorModeToggle() {
    let aux = document.documentElement;
    aux.classList.remove($colorSettings.colorMode);
    $colorSettings.changeColorMode();
    aux.classList.add($colorSettings.colorMode);
  }

  export { clazz as class };
</script>

<div class={clazz}>
  <div
    class="p-2 bg-area rounded-lg dark:bg-area-dark text-text-dark dark:text-text cursor-pointer hover:opacity-50"
    on:click={handleColorModeToggle}
  >
    <Icon
      icon="material-symbols:invert-colors"
      width="18"
      height="18"
      class="text-text-terciary"
    />
  </div>
</div>
