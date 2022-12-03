<script>
  import Icon from "@iconify/svelte";
  import colorSettings from "../store/UserColorsStore";

  function handleColorModeToggle() {
    let aux = document.getElementById("app");
    aux.classList.remove($colorSettings.colorMode);
    $colorSettings.changeColorMode();
    aux.classList.add($colorSettings.colorMode);
  }
</script>

<div
  class="absolute top-4 right-4 p-2 hidden xl:block bg-area rounded-lg dark:bg-area-dark text-text-dark dark:text-text cursor-pointer hover:opacity-50"
  on:click={handleColorModeToggle}
>
  <Icon
    icon="material-symbols:invert-colors"
    width="18"
    height="18"
    class="text-text-terciary"
  />
</div>
