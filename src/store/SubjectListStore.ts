import { writable, type Writable } from "svelte/store";

const subjectList: Writable<Subject[]> = writable([]);

export default subjectList;
