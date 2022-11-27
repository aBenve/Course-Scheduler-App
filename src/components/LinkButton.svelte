<script lang="ts">
  import Icon from "@iconify/svelte";

  import { Link } from "svelte-routing";

  export let title: string;
  export let link: string;
</script>

<Link
  to={link}
  class="cursor-pointer inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
>
  <span class="mr-2"> {title} </span>
  <Icon icon="material-symbols:arrow-right-alt-rounded" width="26" height="26"/>
</Link>
