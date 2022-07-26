<script>
  import { Router, Link, Route } from "svelte-routing";
  import Input from "./routes/Input.svelte";
  import Options from "./routes/Options.svelte";

  export let url = "";
</script>

<Router {url}>
  <div>
    <Route path="Options" component={Options} />
    <Route path="/"><Input /></Route>
  </div>
</Router>
