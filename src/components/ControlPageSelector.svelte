<script lang="ts">
  import pages from "../store/SidebarPages";

  function selectPage(newPage) {
    if ($pages.currentPage !== newPage) {
      $pages.currentPage = newPage;
      console.log("page changed to", $pages.pages[newPage]);
    }
  }
</script>

<div class=" w-full flex gap-x-1 rounded-lg ">
  {#each $pages.pages as page, i}
    <div
      class=" w-1/2 flex justify-center items-center  flex-col p-5 rounded-lg cursor-pointer colorTransition 
      {$pages.pages[$pages.currentPage] === page
        ? 'bg-accent text-accent hover:bg-accent-dark bg-opacity-30 hover:bg-opacity-30 hover:dark:bg-opacity-30'
        : 'hover:bg-background dark:hover:bg-zone-dark text-text-dark dark:text-text-secondary text-opacity-30 '}
      "
      on:click={() => selectPage(i)}
    >
      <span class="font-medium pointer-events-none">
        {page}
      </span>
    </div>
  {/each}
</div>
