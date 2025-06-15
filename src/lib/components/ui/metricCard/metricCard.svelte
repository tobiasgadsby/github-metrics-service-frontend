<script>

    import negativeIcon from "../../../assets/negative-icon.png";

    import { Card } from "flowbite-svelte";

    let {title, health} = $props();

</script>

<Card class="w-full shadow-md { health.healthQuality < 1.0 ? 'border-red-600' : 'border-green-600'}">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
    <div class="grid grid-cols-2 gap-2 p-2">
        {#each health.comments as comment}
            <div class="flex flex-row items-center justify-center gap-2">
                <img src={negativeIcon} class="h-3"/>
                <p class="text-sm">{comment.details}</p>
            </div>
        {/each}
    </div>
</Card>
