import {Subject} from "rxjs";
import { derived, writable, type Writable } from "svelte/store";

const selectedOption: Writable<number | null> = writable(null);

export default selectedOption;
