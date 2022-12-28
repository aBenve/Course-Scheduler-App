import { writable, type Writable } from "svelte/store";

const selectedPlan: Writable<string> = writable(null);

export default selectedPlan;
