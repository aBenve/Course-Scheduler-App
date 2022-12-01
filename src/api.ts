import {Api} from "@course-scheduler-app/scheduler-wasm";

export let api: Api;

export function initializeApi() {
    api = new Api(import.meta.env.VITE_API_HOST);
}
