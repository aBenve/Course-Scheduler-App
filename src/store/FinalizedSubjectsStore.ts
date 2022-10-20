import { writable, type Writable } from "svelte/store";
//import { SubjectInfo } from "scheduler-wasm";

// llamado a la api
const subjects: Writable<{
  mandatory: Subject[];
  optional: Subject[];
  ignore: Subject[];
}> = writable({ mandatory: [], optional: [], ignore: [] });

//subjects.subscribe((v) => console.log("Params updated!", v))

export default subjects;
