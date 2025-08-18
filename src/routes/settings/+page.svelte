<script>
    import { Toggle } from "flowbite-svelte";

    let actionChecked = $state(false)

    $effect(() => {
        console.log("Working: " + actionChecked);
    });

</script>

<div class="p-4">
    <div class="card bg-gray-800 rounded border-1 border-gray-700 w-1/3 p-2 space-y-2">
        <h1 class="text-3xl text-white font-bold underline">Settings</h1>
        <div>
            <Toggle bind:checked={actionChecked}>Enable Actions</Toggle>
        </div>
    </div>
</div>