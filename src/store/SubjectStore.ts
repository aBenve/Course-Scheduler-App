import { writable, type Writable } from "svelte/store";
//import { SubjectInfo } from "scheduler-wasm";

export type SubjectCategorization = {mandatory: Subject[], optional: Subject[], ignore: Subject[]};

// llamado a la api
const subjects: Writable<SubjectCategorization> = writable({mandatory: [], optional: [], ignore: []})

export default subjects
