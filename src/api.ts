import { Api } from "@course-scheduler-app/scheduler-wasm";

export let api: Api;

export function initializeApi() {
  api = new Api(import.meta.env.VITE_API_HOST);
  return api;
}

export async function getCareerPlans() {
  let response = await fetch(import.meta.env.VITE_API_HOST + '/plans.json');
  return await response.json();
}
