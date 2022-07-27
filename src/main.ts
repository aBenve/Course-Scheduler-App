import "./app.css";
import App from "./App.svelte";

import init, { set_panic_hook, test, load_from_api } from "scheduler-wasm";

init().then(async () => {
	set_panic_hook();
	await load_from_api();
	test();
});

const app = new App({
  target: document.getElementById("app"),
});

export default app;
