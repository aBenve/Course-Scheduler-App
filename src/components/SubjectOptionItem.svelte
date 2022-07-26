<script lang="ts">
  export let color: string;
  export let subject: string;
</script>

<div
  class="bg-blue-800 rounded-lg w-fit flex items-center justify-between py-2 px-3 gap-2 hover:bg-lime-400"
>
  <svg height="10" width="10">
    <circle cx="5" cy="5" r="5" fill={color} />
  </svg>
  <span> {subject} </span>
</div>
