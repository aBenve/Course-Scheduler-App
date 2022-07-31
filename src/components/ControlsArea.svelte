<script lang="ts">
  import { Link } from "svelte-routing";
  import CustomOptionInput from "../components/CustomOptionInput.svelte";
  import ControlIgnored from "./ControlIgnored.svelte";
  import ControlOptional from "./ControlOptional.svelte";
  import ControlSubjects from "./ControlDragZone.svelte";
  import selectedOption from "../store/SelectedOptionStore";
  import subjects from "../store/SubjectStore";
  import ControlDragZone from "./ControlDragZone.svelte";

  let clazz: string;
  export { clazz as class };

  const flipDurationMs = 0;
</script>

<div class={clazz}>
  <div class="bg-area h-full p-5 rounded-lg flex flex-col items-center gap-y-5">
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
    <div class=" w-full flex flex-col  gap-y-5 overflow-y-scroll ">
      <ControlDragZone
        {flipDurationMs}
        dragZoneArea="mandatory"
        title="Obligatory"
        class="max-h-1/5"
      />
      <ControlDragZone
        {flipDurationMs}
        dragZoneArea="optional"
        title="Optional"
        class="max-h-[40%] "
      />
      <ControlDragZone
        {flipDurationMs}
        dragZoneArea="ignore"
        title="Ignore"
        class="max-h-1/5"
      />
    </div>
  </div>
</div>
