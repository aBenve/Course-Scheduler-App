import { writable, type Writable } from "svelte/store";
//import { SubjectInfo } from "scheduler-wasm";

export type Settings = {
  gap: number;
  min_credits: number;
  min_subjects: number;
  max_credits: number;
  max_subjects: number;
};

// llamado a la api
const settings: Writable<Settings> = writable({
  gap: 0,
  min_credits: 1,
  min_subjects: 1,
  max_credits: 50,
  max_subjects: 20,
});

export default settings;
