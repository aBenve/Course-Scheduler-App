<script lang="ts">
  import CustomOptionInput from "../components/CustomOptionInput.svelte";
  import DataInput from "../components/DataInput.svelte";
  import LinkButton from "../components/LinkButton.svelte";
</script>

<main
  class="flex justify-center items-center h-screen bg-background dark:bg-background-dark "
>
  <section
    class="shadow-md p-5 sm:p-10 rounded-lg bg-area dark:bg-area-dark w-1/4 min-w-fit m-10 hover:scale-[0.99] transition-all ease-out duration-200"
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
      <LinkButton title="Start" link="Options" />
    </div>
  </section>
</main>
