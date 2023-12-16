<script lang="ts">
  import { Route, Router } from "svelte-routing";
  import { scale } from "svelte/transition";
  import Input from "./routes/Input.svelte";
  import NotFound from "./routes/NotFound.svelte";
  import Options from "./routes/Options.svelte";
  import apiStore from "./store/ApiStore";

  import LoadingSpinner from "./components/LoadingSpinner.svelte";

  export let url = "";
</script>

<Router {url}>
  <div id="app" class="font-principal">
    {#if $apiStore === undefined}
      <Route>
        <div
          class="w-full h-screen flex items-center justify-center"
          transition:scale
        >
          <LoadingSpinner />
        </div>
      </Route>
    {:else}
      <Route path="Options"><Options /></Route>
      <Route path="/"><Input /></Route>
      <Route path="*"><NotFound /></Route>
    {/if}
  </div>
</Router>
