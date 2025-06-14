<script>

    import negativeIcon from "$lib/assets/negative-icon.png";
    import * as Card from "$lib/components/ui/card";

    let {title, health} = $props();

</script>

<Card.Root class="w-full shadow-md { health.healthQuality < 1.0 ? 'border-red-600' : 'border-green-600'}">
    <Card.Header>
        <Card.Title>{title}</Card.Title>
    </Card.Header>
    <Card.Content>
        <div class="grid grid-cols-2 gap-2 p-2">
            {#each health.comments as comment}
                <div class="flex flex-row items-center justify-center gap-2">
                    <img src={negativeIcon} class="h-3"/>
                    <p class="text-sm">{comment.details}</p>
                </div>
            {/each}
        </div>
    </Card.Content>
</Card.Root>
