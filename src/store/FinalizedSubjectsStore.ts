import { writable, type Writable } from "svelte/store";
import type {SubjectCategorization} from "./SubjectStore";
//import { SubjectInfo } from "scheduler-wasm";

// llamado a la api
const subjects: Writable<SubjectCategorization> = writable({ mandatory: [], optional: [], ignore: [] });

//subjects.subscribe((v) => console.log("Params updated!", v))

export default subjects;
