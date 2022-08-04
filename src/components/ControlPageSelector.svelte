<script lang="ts">
  import pages from "../store/SidebarPages";

  function selectPage(newPage) {
    if ($pages.currentPage !== newPage) {
      $pages.currentPage = newPage;
      console.log("page changed to", $pages.pages[newPage]);
    }
  }
</script>

<div class=" w-full flex gap-x-1 rounded-lg">
  {#each $pages.pages as page, i}
    <div
      class=" w-1/2 flex justify-center items-center  flex-col p-5 rounded-lg cursor-pointer 
      {$pages.pages[$pages.currentPage] === page
        ? 'bg-blue-200 dark:bg-blue-800 text-blue-600 dark:text-blue-400  hover:bg-blue-300 dark:hover:bg-blue-600 '
        : 'hover:bg-background dark:hover:bg-zone-dark text-text-dark dark:text-text-secondary text-opacity-20 '}
      "
      on:click={() => selectPage(i)}
    >
      <span class="font-medium pointer-events-none">
        {page}
      </span>
    </div>
  {/each}
</div>
