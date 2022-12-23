<script lang="ts">
  import Icon from "@iconify/svelte";

  import { Link } from "svelte-routing";

  export let title: string;
  export let icon: string;
  export let link: string;
</script>

<Link
  to={link}
  class="cursor-pointer inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-accent rounded-lg hover:bg-accent-dark focus:ring-2 focus:outline-none focus:ring-accent-dark"
>
  <span class="mr-2"> {title} </span>
  <Icon {icon} width="18" height="18" />
</Link>
