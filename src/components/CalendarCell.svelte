<script>
    export let col;
    export let row;
    export let bgColor;

    let isActive = false;
    // border-accent hover:border-2 hover:border-accent hover:border-solid
</script>

<div
    on:mousedown={(e) => {e.preventDefault();isActive = !isActive}}
    on:mouseenter={(e) => (e.buttons === 1 ? (isActive = true) : null)}
    class="CalendarCell relative cursor-pointer col-start-{col} row-start-{row} col-span-1 {bgColor}  {isActive
        ? 'active'
        : ''} colorTransition"
/>

<style>
    .CalendarCell:hover::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #5375f350;
        border-radius: 0.5rem;
    }

    .active.CalendarCell::after {
        content: "";
        position: absolute;
        top: 0.125rem;
        left: 0.125rem;
        width: calc(100% - 0.25rem);
        height: calc(100% - 0.25rem);
        background-color: #5375f3;
        border-radius: 0.5rem;
    }
</style>
