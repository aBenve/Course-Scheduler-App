<script>
  import ControlDragZone from "./ControlDragZone.svelte";
  let flipDurationMs = 0;
</script>

<div class=" w-full flex flex-col  gap-y-5 overflow-y-auto">
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
