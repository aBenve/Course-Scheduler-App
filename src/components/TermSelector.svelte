<script lang="ts">
  import selectedTermStore from "src/store/SelectedTermStore";
  import { Semester } from "@course-scheduler-app/scheduler-wasm";
  import Dropdown from "./Dropdown.svelte";

  let selectedYear: number = $selectedTermStore.year;
  let selectedSemester: Semester = $selectedTermStore.semester;
</script>

<div class="flex items-center space-x-2">
  <Dropdown
    on:change={(option) => {
      $selectedTermStore.year = option.detail;
    }}
    options={new Array(10).fill(0).map((_, i) => 2023 + i)}
    inverted={true}
    selectedOption={selectedYear}
  />
  <Dropdown
    on:change={(option) => {
      $selectedTermStore.semester = option.detail;
    }}
    optionToString={option => {
      if (option == Semester.First) {
        return "First";
      } else if (option == Semester.Second) {
        return "Second";
      }
    }}
    options={[Semester.First, Semester.Second]}
    inverted={true}
    selectedOption={selectedSemester}
  />
</div>
