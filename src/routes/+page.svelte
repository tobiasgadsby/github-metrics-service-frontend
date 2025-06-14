<script lang="ts">
    import {onMount} from "svelte";
    import Health from "$lib/components/health.svelte";
    import {Separator} from "$lib/components/ui/separator";
    import * as Card from "$lib/components/ui/card";
    import MetricCard from "$lib/components/ui/metricCard/metricCard.svelte";
    import Repository from "$lib/components/repository.svelte";


    let repositories: API.Repository[] = [];

    let pullRequests: API.PullRequest[] = [];

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

    async function updateData(repository: API.Repository) {
        try {
            selectedRepository = repository;
            const response = await fetch(`http://localhost:2126/getPullRequests?repositoryId=${repository.id}`)
            pullRequests = await response.json();
            console.log(pullRequests);
        } catch (error) {
            console.error(error);
        }
    }

    let selectedRepository: API.Repository | null = null;

</script>

<div class="flex gap-4 p-2 h-screen">
    <div class="w-1/4 h-full">
        <Card.Root class="h-screen">
            <Card.Header>
                <Card.Title>Your Teams Repositories</Card.Title>
            </Card.Header>
            <Card.Content class="overflow-scroll h-full">
                <div class="flex flex-col gap-2 overflow-scroll p-0">
                    <Separator class="my-4"/>
                    {#each repositories as repository}
                        <Repository repository={repository} onclickhandler={() => updateData(repository)}
                                    selectedRepository={selectedRepository}/>
                    {/each}
                </div>
            </Card.Content>
        </Card.Root>
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