<script>
  import ControlDragZone from "./ControlDragZone.svelte";
  let flipDurationMs = 0;
</script>

<div class=" w-full h-full ControlGrid  gap-y-5 overflow-y-auto">
  <ControlDragZone
    {flipDurationMs}
    dragZoneArea="mandatory"
    title="Obligatory"
    class="  "
  />
  <ControlDragZone
    {flipDurationMs}
    dragZoneArea="optional"
    title="Optional"
    class=" "
  />
  <ControlDragZone
    {flipDurationMs}
    dragZoneArea="ignore"
    title="Ignore"
    class=""
  />
</div>

<style>
  .ControlGrid {
    display: grid;
    grid-template-rows: minmax(6rem, 1fr) minmax(5rem, 2fr) minmax(5rem, 1fr);
  }
</style>
