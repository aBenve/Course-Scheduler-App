<script lang="ts">
    import ConfigurationSliderButton from "./ConfigurationSliderButton.svelte";
</script>

<div
    class="flex items-center justify-around md:justify-start gap-2 md:overflow-x-auto overflow-visible"
>
    <ConfigurationSliderButton
        min_label="min_credits"
        max_label="max_credits"
        placeholder="18"
        max={50}
        min={1}
        sliderText="Credits amount"
        buttonText="Credits"
    />
    <ConfigurationSliderButton
        min_label="gap"
        max_label="gap"
        placeholder="2"
        max={10}
        min={0}
        sliderText="Gap amount"
        buttonText="Gap"
    />
    <ConfigurationSliderButton
        min_label="min_subjects"
        max_label="max_subjects"
        placeholder="5"
        max={20}
        min={1}
        sliderText="Subjects amount"
        buttonText="Subjects"
    />
</div>
