<script lang="ts">
  import { Link } from "svelte-routing";
  import Icon from "@iconify/svelte";
  import ControlContent from "./ControlContent.svelte";
  import { fly } from "svelte/transition";
  let clazz: string;
  export { clazz as class };

  let page: string;

  function changePage(newPage) {
    page = newPage;
  }
</script>

<div class={clazz}>
  <div
    in:fly={{ x: -10, duration: 500, delay: 200 }}
    class="bg-area dark:bg-area-dark h-full p-5 rounded-lg flex flex-col items-center gap-y-5 "
  >
    <div class="flex w-full">
      <Link to="/">
        <Icon icon="material-symbols:arrow-back-ios-new-rounded" width="18" height="18" class="text-gray-500"/>
      </Link>
    </div>
    <ControlContent />
  </div>
</div>
