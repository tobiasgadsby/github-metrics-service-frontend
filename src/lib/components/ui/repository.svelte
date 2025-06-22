<script>

    import { Button, Progressradial } from "flowbite-svelte";
    
    import HealthRadial from "./healthRadial/healthRadial.svelte";

    let {repository, onclickhandler, selectedRepository} = $props();

    let radialColor = $derived(repository.healthQuality < 0.4 ? 'red' : repository.healthQuality < 1.0 ? 'orange' : 'emerald')

</script>

<Button outline class="w-full flex justify-between hover:outline-4 gap-2  outline-primary-500 hover:text-primary-500" onclick={onclickhandler} variant={selectedRepository === repository ? "secondary" : "ghost"}>
    <h1 class="m-0">{repository.name}</h1>
    <HealthRadial size={8} thickness={15} healthQuality={repository.healthQuality}/>
</Button>