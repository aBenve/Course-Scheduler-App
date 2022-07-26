<script lang="ts">
  import { Link } from "svelte-routing";
  import CustomOptionInput from "../components/CustomOptionInput.svelte";
  import ControlSubjects from "./ControlSubjects.svelte";
  let clazz: string;
  export { clazz as class };
</script>

<div class={clazz}>
  <div
    class="bg-blue-400 h-full p-5 rounded-lg flex flex-col items-center gap-y-5"
  >
    <div class="flex justify-between w-full">
      <Link to="/">back</Link>
      Scheduler
    </div>
    <div class="flex gap-2 w-full">
      <CustomOptionInput label="Gap" placeholder="2" value={2} />
      <!--THis values must come from global context-->
      <CustomOptionInput label="Credits" placeholder="18" value={2} />
      <CustomOptionInput label="Subjects" placeholder="5" value={2} />
    </div>
    <ControlSubjects />
    <div
      class="bg-blue-600 w-full h-1/2 flex justify-center items-center rounded-lg"
    >
      Ignored
    </div>
  </div>
</div>
