import { writable, type Writable } from "svelte/store";

const selectedPlan: Writable<string | null> = writable(
  localStorage.selectedPlan ?? null
);

selectedPlan.subscribe((selectedPlan) => {
  if (selectedPlan !== null) localStorage.selectedPlan = selectedPlan;
});

selectedPlan.subscribe((plan) => console.log(plan));

console.log(localStorage.selectedPlan);

export default selectedPlan;
