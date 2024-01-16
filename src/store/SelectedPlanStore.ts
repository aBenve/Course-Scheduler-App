import { writable, type Writable } from "svelte/store";

const selectedPlan: Writable<string | null> = writable(
  localStorage.selectedPlan ?? undefined
);

selectedPlan.subscribe((selectedPlan) => {
  if (selectedPlan !== undefined) localStorage.selectedPlan = selectedPlan;
});

selectedPlan.subscribe((plan) => console.log(plan));

console.log(localStorage.selectedPlan);

export default selectedPlan;
