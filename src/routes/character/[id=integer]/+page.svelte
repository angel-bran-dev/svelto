<svelte:head>
	<title>{`Character: ${character.name}`}</title>
</svelte:head>

<script>
	/** @type {import('./$types').PageData} */
    export let data;

    const { character } = data;

	function history_back() {
		window.history.back();
	}
</script>

<div class="grid min-h-full place-items-center py-10">
    <div class="text-center w-full">
		<img src="{character.image}" alt="{character.name}" class="mx-auto h-40 w-auto rounded-full" />
		<h1 class="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">{character.name}</h1>
		<div class="flex justify-between my-8 w-1/3 mx-auto">
			<p>Specie: <span class="text-yellow-400">{character.species}</span></p>
			<p>Status: <span class="{character.status === 'Alive' ? 'text-green-400' : character.status === 'unknown' ? 'text-yellow-400' : 'text-red-400'}">{character.status}</span></p>
		</div>
		<a href="{`/location/${character.location.url.split('/').pop()}`}" class="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">{character.location.name}</a>
    </div>

	<main class="text-center mt-10">
		<button on:click={history_back} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-3">Atras</button>
	</main>
</div>
