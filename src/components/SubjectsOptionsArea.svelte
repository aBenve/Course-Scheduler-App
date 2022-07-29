<script lang="ts">
  import SubjectOptionList from "./SubjectOptionList.svelte";
  import options from "../store/OptionStore";

  let clazz: string;
  export { clazz as class };
</script>

<div class={clazz}>
  <div
    class="bg-blue-400 h-full w-full p-5 rounded-lg flex flex-col gap-y-2 overflow-scroll"
  >
    <SubjectOptionList />
  </div>
</div>
