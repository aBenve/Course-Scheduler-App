<script lang="ts">
  import pages from "../store/SidebarPages";

  function selectPage(newPage) {
    if ($pages.currentPage !== newPage) {
      $pages.currentPage = newPage;
      console.log("page changed to", $pages.pages[newPage]);
    }
  }
</script>

<div class=" w-full flex gap-x-1  border-gray-400 border-solid rounded-lg">
  {#each $pages.pages as page, i}
    <div
      class=" hover:bg-gray-200 text-gray-400 w-1/2 flex justify-center items-center  flex-col p-5 rounded-lg cursor-pointer
      {$pages.pages[$pages.currentPage] === page
        ? 'bg-blue-200 text-blue-500  hover:bg-blue-300 font-blue'
        : ''}
      "
      on:click={() => selectPage(i)}
    >
      <span class="font-medium pointer-events-none">
        {page}
      </span>
    </div>
  {/each}
</div>
