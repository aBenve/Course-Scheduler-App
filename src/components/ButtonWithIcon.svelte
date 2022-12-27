<script>
    import Icon from "@iconify/svelte";
    import { text } from "svelte/internal";

    export let icon;
    export let iconWidth;
    export let iconHeight;
    export let title;
    export let iconStyles;
    export let textStyles;
</script>

<Icon {icon} width={iconWidth} height={iconHeight} class={iconStyles} />
<span class={textStyles}>{title}</span>
