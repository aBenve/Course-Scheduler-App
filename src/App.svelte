<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Input from "./routes/Input.svelte";
  import Options from "./routes/Options.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import { scale } from "svelte/transition";
  export let url = "";

  import init, { set_panic_hook } from "@course-scheduler-app/scheduler-wasm";
  import LoadingSpinner from "./components/LoadingSpinner.svelte";
  import { initializeApi } from "./api";

  async function load() {
    await init();
    set_panic_hook();
    initializeApi();
  }
  let loading = load();
</script>

<Router {url}>
  <div id="app" class="font-principal">
    {#await loading}
      <Route>
        <div
          class="w-full h-screen flex items-center justify-center"
          transition:scale
        >
          <LoadingSpinner />
        </div>
      </Route>
    {:then _}
      <Route path="Options" component={Options} />
      <Route path="/"><Input /></Route>
      <Route path="*"><NotFound /></Route>
    {/await}
  </div>
</Router>
