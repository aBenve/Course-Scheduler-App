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
  import options from "./store/OptionStore";
  import subjects from "./store/SubjectStore";

  async function load() {
    await init();
    set_panic_hook();
    await load_from_api(2022, Semester.Second);
    console.log(get_subject_info("61.20"));

    let mandatory = ["72.07", "72.38", "12.83"];
    let optional = [
      "61.23",
      "72.41",
      "72.42",
      "93.75",
      "72.43",
      "94.23",
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
      "94.62",
    ];

    options.setQuery(mandatory, optional);
    options.addPage();

    function to_subject(subject: SubjectInfo): Subject {
      return {
        id: subject.code,
        title: subject.name,
      };
    }

    let mandatory_subjects = mandatory.map(get_subject_info).map(to_subject);
    let optional_subjects = optional.map(get_subject_info).map(to_subject);

    console.log(mandatory_subjects, optional_subjects);

    subjects.set({
      mandatory: mandatory_subjects,
      optional: optional_subjects,
    });

    function isCode(v: string) {
      return v.length == 5 && v[2] == ".";
    }

    subjects.subscribe((v) => {
      options.setQuery(
        v.mandatory.map((s) => s.id).filter(isCode),
        v.optional.map((s) => s.id).filter(isCode)
      );
      options.addPage();
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
