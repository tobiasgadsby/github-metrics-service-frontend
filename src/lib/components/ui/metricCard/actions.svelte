<script>

    import {Dropdown, DropdownItem, Modal, Button, P} from "flowbite-svelte";

    let deleteModal = $state(false);

    let {name,componentId,componentType, deleteComponent} = $props();

    console.log("ACTIONS: ",componentId);

    function handleDelete(componentId,componentType) {
        deleteModal = false;
        console.log("TEST: ",componentId);
        deleteComponent(componentId, componentType);
    }

</script>

<Dropdown simple>
    {#if componentType === "BRANCH"}
        <DropdownItem>Open Pull Request</DropdownItem>
    {:else}
        <DropdownItem>Merge</DropdownItem>
    {/if}
    <DropdownItem onclick={() => (deleteModal=true)} >Delete</DropdownItem>
</Dropdown>

<Modal title="Are you sure you want to delete {name}" form bind:open={deleteModal} class="w-1/5">
    <div class="flex items-center justify-between">
    <P>This action will delete the branch in your Github Repository</P>

    <Button type="submit" value="success" color="red" class="cursor-pointer" onclick={() => handleDelete(componentId, componentType)}>Delete</Button>
    </div>
</Modal>