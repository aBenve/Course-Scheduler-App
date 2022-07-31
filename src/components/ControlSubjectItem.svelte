<script lang="ts">
  export let title: string;
</script>

<div
  class="w-full flex items-center rounded-lg h-fit py-3 px-4 hover:bg-gray-300 text-xs "
>
  <svg height="12" width="12" opacity="20%">
    <circle cx="2" cy="2" r="1.5" fill="black" />
    <circle cx="2" cy="8" r="1.5" fill="black" />
    <circle cx="8" cy="2" r="1.5" fill="black" />
    <circle cx="8" cy="8" r="1.5" fill="black" />
  </svg>
  <span class="ml-4 "> {title} </span>
</div>
