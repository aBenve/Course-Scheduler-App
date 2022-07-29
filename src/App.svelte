<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Input from "./routes/Input.svelte";
  import Options from "./routes/Options.svelte";

  export let url = "";

  import init, {
    set_panic_hook,
    Semester,
    get_subject_info,
    load_from_api,
    SubjectInfo,
  } from "scheduler-wasm";
  import subjects from "./store/SubjectStore";

  async function load() {
    await init();
    set_panic_hook();
    await load_from_api(2022, Semester.Second);

    let mandatory = [
      "72.37",
      "72.38", 
      "12.83",
      "61.23",
    ];
    let optional = [
      "72.07", 
      "93.75",
    ];

    let ignore = [
      "72.25",
      "61.32",
      "72.40",
      "72.41",
      "72.42",
      "72.43",
      "72.45",
      "94.23",
      "10.09",
      "16.04",
      "16.50",
      "23.15",
      "61.50",
      "72.58",
      "72.60",
      "72.74",
      "72.75",
      "72.89",
      "72.92",
      "94.42",
      "94.62"
    ];

    // options.setQuery(mandatory, optional);
    // options.addPage();

    function to_subject(subject: SubjectInfo): Subject {
      return {
        id: subject.code,
        title: subject.name,
      };
    }

    let mandatory_subjects = mandatory.map(get_subject_info).map(to_subject);
    let optional_subjects = optional.map(get_subject_info).map(to_subject);
    let ignore_subjects = ignore.map(get_subject_info).map(to_subject);

    console.log(mandatory_subjects, optional_subjects);

    subjects.set({
      mandatory: mandatory_subjects,
      optional: optional_subjects,
      ignore: ignore_subjects,
    });
  }
  let loading = load();
</script>

<Router {url}>
  {#await loading}
    <div class="text-center">Loading...</div>
  {:then _}
    <div>
      <Route path="Options" component={Options} />
      <Route path="/"><Input /></Route>
    </div>
  {/await}
</Router>
