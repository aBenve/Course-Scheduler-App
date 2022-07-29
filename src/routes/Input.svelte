<script lang="ts">
  import CustomOptionInput from "../components/CustomOptionInput.svelte";
  import DataInput from "../components/DataInput.svelte";
  import StartButton from "../components/StartButton.svelte";
</script>

<main class="flex justify-center items-center h-screen bg-gray-200">
  <section
    class="shadow-md p-5 sm:p-10 rounded-lg bg-gray-100 w-1/4 min-w-fit m-10"
  >
    <div class="flex flex-col items-center gap-y-5 ">
      <DataInput
        label="Input"
        type="text"
        placeholder="Available subjecs here.."
      />
      <div class="flex gap-5 w-full justify-between  items-center">
        <CustomOptionInput label="gap" placeholder="2" />
        <CustomOptionInput label="credits" placeholder="18" />
        <CustomOptionInput label="subjects" placeholder="5" />
      </div>
      <div class="text-xs text-center text-gray-400">
        Note that all the options set a maximum value
      </div>
      <StartButton />
    </div>
  </section>
</main>
