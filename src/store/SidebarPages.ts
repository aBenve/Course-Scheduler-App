import { writable, type Writable } from "svelte/store";
//import { SubjectInfo } from "scheduler-wasm";

// llamado a la api
const pages: Writable<{currentPage: number, pages:Array<string>}> = writable({
    currentPage: 0,
    pages: ["Subjects", "Settings"]
});

export default pages
