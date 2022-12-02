import { writable, type Writable } from "svelte/store";
//import { SubjectInfo } from "scheduler-wasm";

export type Settings = {
  gap: number;
  min_credits: number;
  min_subjects: number;
};

// llamado a la api
const settings: Writable<Settings> = writable({
  gap: 0,
  min_credits: 1,
  min_subjects: 1,
});

export default settings;
