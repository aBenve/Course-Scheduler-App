<script lang="ts">
  import fourDots from "../assets/icons/FourDots.svg";
  export let title: string;
</script>

<div
  class="w-full flex items-center rounded-lg h-fit py-3 px-4 hover:bg-blue-100 text-xs
    hover:font-bold text-text-dark dark:text-text-secondary dark:hover:bg-blue-900 hover:text-blue-600  dark:hover:text-blue-400  font-medium"
>
  <img
    src={fourDots}
    alt="draggable"
    width="12"
    height="12"
    class="opacity-25"
  />
  <span class="ml-4"> {title} </span>
</div>
