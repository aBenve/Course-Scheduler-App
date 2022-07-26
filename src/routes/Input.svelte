<script lang="ts">
  import CustomOptionInput from "../components/CustomOptionInput.svelte";
  import DataInput from "../components/DataInput.svelte";
  import StartButton from "../components/StartButton.svelte";
</script>

<main class="flex justify-center items-center h-screen bg-gray-200">
  <section class="shadow-md p-10 rounded-lg bg-gray-100">
    <div class="flex flex-col items-center gap-y-5">
      <DataInput
        label="Input"
        type="text"
        placeholder="Available subjecs here.."
      />
      <div class="flex gap-5 w-full">
        <CustomOptionInput label="Gap" placeholder="2" />
        <CustomOptionInput label="Credits" placeholder="18" />
        <CustomOptionInput label="Subjects" placeholder="5" />
      </div>
      <div class="text-xs text-gray-400">
        Note that all the options set a maximum value
      </div>
      <StartButton />
    </div>
  </section>
</main>
