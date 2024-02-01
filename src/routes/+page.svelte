<svelte:head>
	<title>Rick and Morty API</title>
</svelte:head>

<script>
// @ts-nocheck
import { api } from '$lib/index';
import { goto } from '$app/navigation';
import { page } from '$app/stores';
import { onMount } from 'svelte';

let characters = [];
let search_name = '';

async function searchCharacter() {
    const response = await fetch(`${api}/character/?name=${search_name}`)
        .then(response => response.json())
        .then(data => data.results)
        .catch(() => []);

    characters = (response === undefined) ? [] : response;

    if (search_name !== '') {
        goto(`?name=${search_name}`, { keepFocus: true });
    }
    else {
        goto('/', { keepFocus: true });
    }
}

onMount(() => {
    search_name = $page.url.searchParams.get('name') || '';
    searchCharacter();
});
</script>

<div class="mt-6 mx-auto flex max-w-md gap-x-4">
	<input id="searchCharacter" name="searchCharacter" type="search" autocomplete="off" class="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white ring-1 ring-inset ring-green-500 sm:text-sm sm:leading-6" bind:value={search_name} on:input={searchCharacter} placeholder="Rick Sanchez" />
	<button type="button" class="flex-none rounded-md bg-green-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500" on:click={searchCharacter}>
		<i class="fa-solid fa-search mr-2"></i>
		Buscar personaje
	</button>
</div>

{#if characters.length > 0}
<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
	{#each characters as character}
		<div class="group relative">
			<div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-50">
				<img src="{character.image}" alt="{character.name}" class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
			</div>
			<div class="mt-4 flex justify-between">
				<div>
					<h3 class="text-gray-200">
						<a href="/character/{character.id}">
						<span aria-hidden="true" class="absolute inset-0"></span>
						{character.name}
						</a>
					</h3>
					<p class="mt-1 text-sm text-gray-400">{character.species}</p>
				</div>
					<p class="{character.status === 'Alive' ? 'text-green-400' : character.status === 'unknown' ? 'text-yellow-400' : 'text-red-400'} text-sm font-medium">{character.status}</p>
			</div>
		</div>
	{/each}
</div>
{:else}
	<div class="relative mt-16">
		<div class="text-center">
			<img src="/png/rick.png" alt="not found" class="mx-auto h-32 w-auto" />
			<h1 class="text-3xl font-bold tracking-tight text-gray-300 sm:text-5xl">No se encontraron personajes</h1>
			<p class="mt-3 text-base leading-7 text-gray-500">Lo sentimos, prueba otro nombre.</p>
		</div>
	</div>
{/if}

