<script lang="ts">
  import Icon from "@iconify/svelte";
  import { Link } from "svelte-routing";
  import { fly } from "svelte/transition";
  import ControlContent from "./ControlContent.svelte";
  import subjectList from "src/store/SubjectListStore";
  import Badge from "./Badge.svelte";
  import ButtonWithIcon from "./ButtonWithIcon.svelte";
  let clazz: string;
  export { clazz as class };
  export let onToggle;

  let page: string;
  let isOpen: boolean = true;
  export let hideButton: boolean = false;

  function changePage(newPage) {
    page = newPage;
  }
</script>

{#if isOpen}
  <main class={clazz}>
    <div
      in:fly={{ x: -10, duration: 500, delay: 200 }}
      class="relative bg-area dark:bg-area-dark h-full p-4 rounded-2xl flex flex-col gap-y-4 colorTransition"
    >
      {#if hideButton}
        <div class="flex w-full items-center justify-end">
          <button
            on:click={() => {
              // if (hideButton) {
              //   console.log("asd");
              //   return;
              // }
              isOpen = false;
              onToggle(isOpen);
            }}
            class="flex space-x-2 items-center hover:bg-zone-secondary dark:hover:bg-zone-secondary-dark hover:bg-opacity-50 p-2 rounded-lg py-2 px-3 "
          >
            <ButtonWithIcon
              icon="material-symbols:hide"
              iconWidth="15"
              iconHeight="15"
              iconStyles="text-text-dark dark:text-text "
              textStyles="text-text-dark dark:text-text text-xs "
              title="Hide"
            />
          </button>
        </div>
      {/if}

      <div class="flex items-center space-x-2 w-full ">
        <span class="text-text-dark dark:text-text colorTransition"
          >Subjects</span
        >
        <Badge title={$subjectList.length} />
      </div>
      <ControlContent />
    </div>
  </main>
{:else}
  <button
    on:click={() => {
      isOpen = true;
      onToggle(isOpen);
    }}
    class="colorTransition bg-area dark:bg-area-dark flex space-x-2 items-center hover:bg-zone dark:hover:bg-zone-dark hover:bg-opacity-50 p-2 rounded-lg py-2 px-3"
  >
    <Icon
      icon="material-symbols:hide"
      width="15"
      height="15"
      class="text-text-dark dark:text-text"
    />
    <span class="text-text-dark dark:text-text text-xs">Show subjects</span>
  </button>
{/if}
