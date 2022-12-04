<script>
  import CustomOptionInput from "./CustomOptionInput.svelte";
</script>

<div class="flex flex-col gap-2 w-full">
  <CustomOptionInput label="gap" placeholder="2" max={10} text="Gap" />
  <CustomOptionInput
    label="min_credits"
    placeholder="18"
    max={50}
    text="Credits"
  />
  <CustomOptionInput
    label="min_subjects"
    placeholder="5"
    max={20}
    text="Subjects"
  />
</div>
