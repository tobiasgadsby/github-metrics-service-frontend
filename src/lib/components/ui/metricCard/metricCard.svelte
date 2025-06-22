<script>

    import negativeIcon from "../../../assets/negative-icon.png";


    import {createEventDispatcher, onMount, tick} from "svelte";
    import { Card } from "flowbite-svelte";

    let {title, health, top, left, componentType, onResize} = $props();

    let card;

    onMount(async () => {
        await tick();
        const rect = card.getBoundingClientRect();
        onResize({width: rect.width, height: rect.height});
    })

</script>

<div bind:this={card} class="absolute transition-all p-1.5 max-w-[400px] bg-gray-800 rounded border-1 border-gray-700" style="top: {top}px; left: {left}px;">
    <div class="flex justify-between gap-2">
        <h5 class="mb-2 text-xl tracking-tight text-gray-900 dark:text-white break-words">{title}</h5>
        <h5 class="px-1 text-sm  w-min text-nowrap h-min rounded {componentType == 'BRANCH' ? 'bg-emerald-600 text-green-200' : 'bg-secondary-600 text-secondary-200'} transparent text-opacity-500">{componentType == "BRANCH" ? "Branch" : "Pull Request"}</h5>
    </div>
    <div class="grid grid-cols-2 gap-2 p-2">
        {#each health.comments as comment}
            <div class="flex flex-row items-center justify-center gap-2">
                <img src={negativeIcon} class="h-3"/>
                <p class="text-sm text-gray-300">{comment.details}</p>
            </div>
        {/each}
    </div>

</div>
