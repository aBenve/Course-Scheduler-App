<script>
  import pages from "../store/SidebarPages";
  import ControlSettings from "./ControlSettings.svelte";
  import ControlSubjects from "./ControlSubjects.svelte";
</script>

{#if $pages.pages[$pages.currentPage] === "Subjects"}
  <ControlSubjects />
{:else}
  <ControlSettings />
{/if}
