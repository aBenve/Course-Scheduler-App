import { writable, type Writable } from "svelte/store";
//import { SubjectInfo } from "scheduler-wasm";

// llamado a la api
const colorSettings: Writable<{colorMode: string, changeColorMode: () => void}> = writable({
    colorMode: "light",
    changeColorMode: () => {
        colorSettings.update(settings => {
            settings.colorMode = settings.colorMode === "light" ? "dark" : "light";
            return settings;
        });
    }
})

export default colorSettings
