import { writable, type Writable } from "svelte/store";
//import { SubjectInfo } from "scheduler-wasm";

// llamado a la api
const settings: Writable<{gap:number, credits: number, subjects: number}> = writable({
    gap: 0,
    credits: 0,
    subjects: 0,
})

export default settings
