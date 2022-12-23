<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Link } from "svelte-routing";
  import { fly } from "svelte/transition";
  import ControlContent from "./ControlContent.svelte";
  import LinkButton from "./LinkButton.svelte";
  let clazz: string;
  export { clazz as class };

  let page: string;

  function changePage(newPage) {
    page = newPage;
  }
</script>

<main class={clazz}>
  <div
    in:fly={{ x: -10, duration: 500, delay: 200 }}
    class="bg-area dark:bg-area-dark h-full p-4 rounded-lg flex flex-col items-center gap-y-5 colorTransition"
  >
    <div class="flex w-full">
      <Link
        to="/"
        class="flex space-x-2 items-center hover:bg-zone-secondary dark:hover:bg-zone-secondary-dark hover:bg-opacity-50 p-2 rounded-lg py-2 px-3"
      >
        <Icon
          icon="material-symbols:arrow-back-ios-new-rounded"
          width="12"
          height="12"
          class="text-text-dark dark:text-text"
        />
        <span class="text-text-dark dark:text-text text-xs">Go back</span>
      </Link>
    </div>
    <ControlContent />
  </div>
</main>
