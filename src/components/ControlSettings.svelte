<script>
  import CustomOptionInput from "./CustomOptionInput.svelte";
</script>

<div class="flex flex-col gap-2 w-full">
  <CustomOptionInput
    min_label="gap"
    max_label="gap"
    placeholder="2"
    max={10}
    min={0}
    text="Gap"
  />
  <CustomOptionInput
    min_label="min_credits"
    max_label="max_credits"
    placeholder="18"
    max={50}
    min={1}
    text="Credits"
  />
  <CustomOptionInput
    min_label="min_subjects"
    max_label="max_subjects"
    placeholder="5"
    max={20}
    min={1}
    text="Subjects"
  />
</div>
