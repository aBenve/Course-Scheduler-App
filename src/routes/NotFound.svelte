<script>
  import LinkButton from "../components/LinkButton.svelte";
</script>

<div
  class="bg-background dark:bg-background-dark text-gray-800 dark:text-gray-200 h-screen w-full flex flex-col justify-center items-center"
>
  <span class="text-9xl font-bold">404</span>
  <span class="text-2xl mb-10">Page not found</span>
  <LinkButton title="Go back" link="/" />
</div>
