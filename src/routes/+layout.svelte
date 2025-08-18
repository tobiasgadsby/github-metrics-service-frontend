<script>
	import '../app.css';
    import githubIcon from "$lib/assets/github_icon.png";
    import {Hr} from "flowbite-svelte";

	let { children } = $props();
</script>
<div class="flex flex-col h-screen">
    <div class="h-[6vh] flex justify-between items-center p-5">
        <div class="w-1/6">
            <a href="/">
                <img src={githubIcon} class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Gitcleanse</span>
            </a>
        </div>
        <div class="w-1/6 flex justify-end">
            <a href="/settings" class="self-center font-semibold whitespace-nowrap dark:text-white">Settings</a>
        </div>
        <div class="w-1/6">
        </div>
    </div>
    <Hr class="h-1 m-0 rounded-lg !bg-white"/>
    {@render children()}
</div>