<script>

    import { Button } from "flowbite-svelte";

    let {repository, onclickhandler, selectedRepository} = $props();

</script>

<Button class="w-full" onclick={onclickhandler} variant={selectedRepository === repository ? "secondary" : "ghost"}>
    <h1 class="">{repository.name}</h1>
</Button>