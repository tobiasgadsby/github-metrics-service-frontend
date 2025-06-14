<script>

    import {Button} from "$lib/components/ui/button/index.js";

    let {repository, onclickhandler, selectedRepository} = $props();

</script>

<Button class="w-full" on:click={onclickhandler} variant={selectedRepository === repository ? "secondary" : "ghost"}>
    <h1 class="">{repository.name}</h1>
</Button>