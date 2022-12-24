<!-- <script lang="ts">
  import Icon from "@iconify/svelte";
  export let title: string;
</script>

<div
  class="w-full flex items-center rounded-lg h-fit py-3 px-4 hover:bg-accent text-xs hover:bg-opacity-20 transition-hover duration-300 ease-in-out
     text-text-dark dark:text-text-secondary dark:hover:bg-accent hover:text-accent  dark:hover:text-accent  font-medium dark:bg-opacity-30 hover:dark:bg-opacity-20"
>
  <Icon
    icon="material-symbols:drag-indicator"
    class="opacity-30 hover:text-accent"
    width={25}
    height={25}
  />
  <span class="ml-4 w-full "> {title} </span>
</div> -->
<script lang="ts">
  import Icon from "@iconify/svelte";

  // import tailwind config
  import tailwindConfig from "../../tailwind.config.js";
  import ControlSubjectItemButton from "./ControlSubjectItemButton.svelte";

  export let onChange;
  export let title: string;
  export let id: string;
  export let importance: string;

  function onChangeButton(type) {
    if (importance !== type) onChange(id, importance, type);
    else onChange(id, importance, "optional");
  }
</script>

<div
  class=" flex items-center space-x-2 rounded-lg  colorTransition justify-between px-3 py-2 {importance ===
  'mandatory'
    ? // ? 'border border-solid border-accent border-2 text-text-dark dark:text-text'
      'bg-accent text-accent font-medium bg-opacity-20 '
    : importance === 'optional'
    ? 'bg-zone dark:bg-zone-dark text-text-dark dark:text-text'
    : 'bg-zone dark:bg-zone-dark text-vertex dark:text-vertex-dark'} "
>
  <span class=" text-xs flex items-start w-[10rem]">{title}</span>

  <ControlSubjectItemButton
    tooltip="Ignore this subject"
    prevImportance={importance}
    forImportance="ignore"
    onChange={() => onChangeButton("ignore")}
    {id}
    icon="material-symbols:do-not-disturb-on-outline-rounded"
    clickedIcon="material-symbols:do-not-disturb-on-rounded"
  />
  <ControlSubjectItemButton
    prevImportance={importance}
    forImportance="mandatory"
    tooltip="Make this subject obligaroty"
    onChange={() => onChangeButton("mandatory")}
    {id}
    icon="material-symbols:lock-open-outline"
    clickedIcon="material-symbols:lock"
  />
</div>

<style>
</style>
