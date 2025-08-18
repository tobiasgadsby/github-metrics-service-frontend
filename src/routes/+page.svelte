<script lang="js">
    import {onMount} from "svelte";
    import MetricCard from "../lib/components/ui/metricCard/metricCard.svelte";
    import githubIcon from "../lib/assets/github_icon.png";
    import HealthRadial from "\$lib/components/ui/healthRadial/healthRadial.svelte";
    import Repository from "../lib/components/ui/repository.svelte";
    import { Card, Sidebar, SidebarGroup, Hr, Dropdown, Button ,DropdownItem, Input } from "flowbite-svelte";
    import { ChartOutline, ChevronDownOutline } from "flowbite-svelte-icons";
    import repository from "$lib/components/ui/repository.svelte";

    let repositories = [];
    let filterOpen = $state(false);
    let mapStagingSize = null;
    let componentSize = {width: 0, height: 0};
    let itemPositions = null;
    let selectedRepository = $state(null)
    let filteredRepositories = null;
    let repositoryComponents = $state([])
    let repoSearchInput = $state("");
    let repoFilter = "All";

    let displayRepositories = $derived.by(() => {
        return repositories.filter(repo => {
            let matchesSearch;
            if(repoSearchInput.length > 0) {
                matchesSearch = repo.name.toLowerCase().includes(repoSearchInput.toLowerCase());
            }
            const matchesFilter = repoFilter === "All" || (repoFilter === "Issues" && repo.healthQuality < 1)
            return matchesFilter && matchesSearch;
        })
    })

    onMount(async () => {
        try {
            const response = await fetch("http://localhost:2126/getRepositories?tenantCode=AL25816")
            repositories = await response.json();
            filteredRepositories = displayRepositories = [...repositories];
            selectedRepository = repositories[0];
        } catch (error) {
            console.error(error);
        }
    })

    // function updateFilter(filter) {
    //     repoFilter = filter;
    //     filterOpen = false;
    //     applyRepoFilters()
    // }
    //
    // function updateSearch() {
    //     applyRepoFilters();
    // }

    // function applyRepoFilters() {
    //     displayRepositories = repositories.filter(repo => {
    //         const matchesSearch = repo.name.toLowerCase().includes(repoSearchInput.toLowerCase());
    //         const matchesFilter = repoFilter === "All" || (repoFilter === "Issues" && repo.healthQuality < 1);
    //         return matchesSearch && matchesFilter;
    //     });
    // }

    function isOverlapping(r1, r2, width, height) {
        return !(
            r1.left + width <= r2.left ||
            r2.left + width <= r1.left ||
            r1.top + height <= r2.top ||
            r2.top + height <= r1.top
        );
    }

    function updateFilter(value) {
        repoFilter = value;
    }

    function placeRandom(widthEdge, heightEdge, items) {
        const mapStagingHeight = mapStagingSize.clientHeight - mapStagingSize.clientHeight * 0.05;
        const mapStagingWidth = mapStagingSize.clientWidth - mapStagingSize.clientWidth * 0.05;
        componentSize = {width: 400, height: 106}; //TODO: Needs updating to become relative
        let placedItems = [];
        let loops = 0;
        for (var i = 0; i < items.length; i++) {
            const item = items[i];
            let top,left;
            do {
                loops++;
                top = Math.floor(Math.random() * (mapStagingHeight - componentSize.height) + heightEdge);
                left = Math.floor(Math.random() * (mapStagingWidth - componentSize.width) + widthEdge);
            } while (
                (placedItems.some(item => isOverlapping({top, left}, item, componentSize.width, componentSize.height))) && loops < 1000);

            placedItems.push({
                ...item,
                top,
                left
            })
        }
        console.log(placedItems);
        console.log("loops: "+ loops)
        return placedItems;
    }

    async function updateData(repository) {
        try {
            selectedRepository = repository;
            const repositoryComponentsResponse = await fetch(`http://localhost:2126/getRepositoryComponents?repositoryId=${repository.id}`)
            repositoryComponents = placeRandom(window.innerWidth / 6, window.innerHeight * 0.07, await repositoryComponentsResponse.json());
        } catch (error) {
            console.error(error);
        }
    }

    function deleteComponent(componentId, componentType) {

        repositoryComponents = repositoryComponents.filter(component => component.componentId !== componentId);

        const formData = new URLSearchParams();
        formData.append("componentId", componentId);
        formData.append("componentType", componentType);

        console.log("DELETE: ", componentId);

        try {
            fetch("http://localhost:2126/deleteComponent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: formData.toString(),
            })
        } catch (error) {
            console.error(error);
        }
    }



</script>

<div class="flex flex-grow p-2 h-full justify-end">
        <Sidebar class="w-1/6 !left-2 !top-23 !rounded-lg">
            <SidebarGroup class="pb-2 h-32">
                <div class="h-1/2 items-center flex justify-center">
                    <h1 class="text-2xl text-white font-bold flex justify-center" >Repositories</h1>
                </div>
                <div class="flex space-x-2 h-1/2 py-2">
                    <div class="w-2/3 h-full">
                        <Input bind:value={repoSearchInput} class="h-full"></Input>
                    </div>
                    <div class="w-1/3 h-full flex">
                        <Button onclick="{() => filterOpen=true}">Filter By<ChevronDownOutline class=" h-full text-white dark:text-white" /></Button>
                        <Dropdown bind:isOpen={filterOpen} simple> <!-- Causing react.fn is not a function error -->
                            <DropdownItem onclick={() => updateFilter("All")}>All</DropdownItem>
                            <DropdownItem onclick={() => updateFilter("Issues")}>Issues</DropdownItem>
                        </Dropdown>
                    </div>
                </div>
            </SidebarGroup>
            <SidebarGroup class="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-w-2.5 scrollbar-thumb-gray-500 space-y-2 overflow-y-auto scrollbar-gutter-stable pr-2 pb-52 h-[calc(100vh-80px)]">
                {#each displayRepositories as repository}
                    <Repository repository={repository} selectedRepository={selectedRepository} onclickhandler={() => updateData(repository)}/>
                {/each}
            </SidebarGroup>
        </Sidebar>
    <div bind:this={mapStagingSize} class="flex flex-col gap-2 w-7/12 p-5">
        {#each repositoryComponents ?? [] as component}
            <!--{console.log(component)}-->
            <MetricCard title={component.name} health={component.health} left={component.left} top={component.top} componentId={component.componentId} onResize={({width, height}) => {
                if (width > componentSize.width) {
                    componentSize.width = width;
                }
                if (height > componentSize.height) {
                    componentSize.height = height;
                }
            }} componentType={component.componentType} onDeleteComponent={deleteComponent}/>
        {/each}
    </div>
    <div class="flex flex-col w-1/4 dark:bg-gray-800 rounded-lg p-2 gap-2 h-full">
        <div class="flex flex-col justify-center items-center border-gray-600 border-3 rounded-lg h-1/6">
            <h1 class="text-2xl text-white font-bold" >{selectedRepository?.name}</h1>
        </div>
        <div class="flex p-0">
            <Card class="w-1/2 bg-gray-300 p-2 h-min" color="primary">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Actions</h5>
                <Hr class="h-1 m-0 rounded-lg"/>
                <div class="flex flex-col py-2">
                    {#if selectedRepository?.healthQuality !== 1.0}
                        {#each repositoryComponents?.map(component => component.health.comments) as comments}
                            {#each comments as comment}
                                <h1>{comment.solution}</h1>
                            {/each}
                        {/each}
                    {:else}
                        <h1>No Action Needed</h1>
                    {/if}
                </div>
            </Card>
            <div class="w-1/2">
                <HealthRadial displayValue={true} thickness={10} size={48} healthQuality={selectedRepository?.healthQuality}/>
            </div>
        </div>
    </div>
</div>