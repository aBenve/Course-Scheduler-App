<script lang="ts">
  import { Link } from "svelte-routing";
  import CustomOptionInput from "../components/CustomOptionInput.svelte";
  import ControlIgnored from "./ControlIgnored.svelte";
  import ControlOptional from "./ControlOptional.svelte";
  import ControlSubjects from "./ControlSubjects.svelte";
  import selectedOption from "../store/SelectedOptionStore";
  import subjects from "../store/SubjectStore";

  let clazz: string;
  export { clazz as class };

  const flipDurationMs = 0;
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
      <CustomOptionInput label="gap" placeholder="2" />
      <!--THis values must come from global context-->
      <CustomOptionInput label="credits" placeholder="18" />
      <CustomOptionInput label="subjects" placeholder="5" />
    </div>
    <ControlSubjects {flipDurationMs} />
    <ControlOptional {flipDurationMs} />
    <ControlIgnored {flipDurationMs} />
  </div>
</div>
