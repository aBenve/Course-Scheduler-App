<script lang="ts">
  import SubjectOptionList from "./SubjectOptionList.svelte";
  import options from "../store/OptionStore";

  let clazz: string;
  export { clazz as class };
</script>

<div class={clazz}>
  <div
    class="bg-area dark:bg-area-dark relative  rounded-lg h-full overflow-auto border-8 border-solid border-area dark:border-area-dark"
  >
    <SubjectOptionList />
  </div>
</div>
