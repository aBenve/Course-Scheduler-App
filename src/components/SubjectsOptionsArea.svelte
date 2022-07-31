<script lang="ts">
  import SubjectOptionList from "./SubjectOptionList.svelte";
  import options from "../store/OptionStore";

  let clazz: string;
  export { clazz as class };
</script>

<div class={clazz}>
  <div class="bg-area relative ">
    <SubjectOptionList />
  </div>
</div>
