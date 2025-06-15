<script lang="ts">
    import {onMount} from "svelte";
    import Health from "../lib/components/ui/health.svelte";
    import MetricCard from "../lib/components/ui/metricCard/metricCard.svelte";
    import Repository from "../lib/components/ui/repository.svelte";
    import { Card } from "flowbite-svelte";

    let repositories = null;
    let selectedRepository = null;
    let pullRequests = null;

    onMount(async () => {
        try {
            const response = await fetch("http://localhost:2126/getRepositories?tenantCode=AL25816")
            repositories = await response.json();
            selectedRepository = repositories[0];
            console.log(repositories);
        } catch (error) {
            console.error(error);
        }
    })

    async function updateData(repository) {
        console.log("UPDATE DATA");
        try {
            selectedRepository = repository;
            const response = await fetch(`http://localhost:2126/getPullRequests?repositoryId=${repository.id}`)
            pullRequests = await response.json();
            console.log(pullRequests);
        } catch (error) {
            console.error(error);
        }
    }



</script>

<div class="flex gap-4 p-2 h-screen">
    <div class="w-1/4 h-full">
        <Card class="h-screen">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Your Teams Repositories</h5>
            <div class="flex flex-col gap-2 overflow-scroll p-0">
                {#each repositories as repository}
                    <Repository repository={repository} onclickhandler={() => updateData(repository)}
                                selectedRepository={selectedRepository}/>
                {/each}
            </div>
        </Card>
    </div>
    <div class="flex flex-col gap-2 w-1/4">
        <h1>Branches</h1>
        {#each selectedRepository?.branches ?? [] as branch}
            <MetricCard title={branch.name} health={branch.health} />
        {/each}
    </div>
    <div class="flex flex-col gap-2 w-1/4">
        <h1>Pull Requests</h1>
        {#each pullRequests ?? [] as pullRequest}
            <MetricCard title={pullRequest.name} health={pullRequest.health} />
        {/each}
    </div>
    <div class="w-1/2">
        <Health/>
    </div>
</div>