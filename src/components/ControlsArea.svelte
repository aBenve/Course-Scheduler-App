<script lang="ts">
  import { Link } from "svelte-routing";
  import CustomOptionInput from "../components/CustomOptionInput.svelte";
  import ControlDragZone from "./ControlDragZone.svelte";
  import BackIcon from "../assets/icons/Back.svg";
  import ControlSidebar from "./ControlSidebar.svelte";
  import ControlPageSelector from "./ControlPageSelector.svelte";
  import ControlContent from "./ControlContent.svelte";
  let clazz: string;
  export { clazz as class };

  let page: string;

  function changePage(newPage) {
    page = newPage;
  }
</script>

<div class={clazz}>
  <div
    class="bg-area dark:bg-area-dark h-full p-5 rounded-lg flex flex-col items-center gap-y-5 "
  >
    <div class="flex justify-between w-full">
      <Link to="/" class="text-gray-500">
        <img src={BackIcon} alt="back" width="15" height="15" />
      </Link>
    </div>
    <ControlContent />
  </div>
</div>
