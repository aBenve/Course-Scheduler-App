<script lang="ts">
  import selectedPlanStore from "src/store/SelectedPlanStore";

  let selectedCareer: string = "S";
  let selectedPlan: string = "S10 A - Rev18";

  const careers = {
    S: {
      name: "Informatica",
      plans: ["S10 - Rev", "S10 - Rev18", "S10 A - Rev18"],
    },
    I: { name: "Industrial", plans: ["I22", "I-13", "I-13T", "I04", "I87/4"] },
    K: {
      name: "Electronica",
      plans: ["K07-Rev.18", "K07A-Rev.18", "K12", "K12A", "K07", "K07A"],
    },
    M: {
      name: "Mecanica",
      plans: [
        "M22 - Agosto",
        "M22-Marzo",
        "M09 - Rev18 (Agosto)",
        "M09 - Rev18 (Marzo)",
        "M 17 Agosto Rev 1",
        "M 17 Marzo Rev 1",
        "M17 Agosto",
        "M17 Marzo",
        "M13 agosto",
        "M13 marzo",
        "M13 marzo(N)",
        "M09 /2",
        "M09 A/2",
      ],
    },
  };

  $: selectedPlan = careers[selectedCareer].plans[0];

  $: $selectedPlanStore = selectedPlan;

</script>

<select bind:value={selectedCareer}>
  {#each Object.entries(careers) as [key, value]}
    <option value={key}>{value.name}</option>
  {/each}
</select>

<select bind:value={selectedPlan}>
  {#each careers[selectedCareer].plans as plan}
    <option>{plan}</option>
  {/each}
</select>
