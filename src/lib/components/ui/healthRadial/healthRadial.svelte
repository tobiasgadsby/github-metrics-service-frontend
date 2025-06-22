<script>

    import {Progressradial} from "flowbite-svelte";

    let {healthQuality, size, thickness, displayValue} = $props();

    let radialColor = $derived(healthQuality < 0.4 ? 'red' : healthQuality < 1.0 ? 'primary' : 'emerald');

</script>

<div class="relative h-min">
<Progressradial class="h-{size} w-{size}" thickness={thickness} color={radialColor} progress={healthQuality*100} />
<div class="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold">{displayValue ? Math.round(healthQuality*100) : ""}</div>
</div>