<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Input from "./routes/Input.svelte";
  import Options from "./routes/Options.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import { scale } from "svelte/transition";
  export let url = "";
  import apiStore from "./store/ApiStore";

  import LoadingSpinner from "./components/LoadingSpinner.svelte";
</script>

<Router {url}>
  <div id="app" class="font-principal">
    {#if $apiStore == null}
      <Route>
        <div
          class="w-full h-screen flex items-center justify-center"
          transition:scale
        >
          <LoadingSpinner />
        </div>
      </Route>
    {:else}
      <Route path="Options" component={Options} />
      <Route path="/"><Input /></Route>
      <Route path="*"><NotFound /></Route>
    {/if}
  </div>
</Router>
