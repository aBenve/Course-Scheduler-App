import { writable, type Writable } from "svelte/store";

const selectedPlan: Writable<string> = writable("S10 A - Rev18");

export default selectedPlan;
