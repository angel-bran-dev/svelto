<script>
	/** @type {string} */
	export let name;

	let about = 'Desde un componenete';

	const irInicio = () => {
		location.href = '/';
	}
</script>

<!-- <style> optional -->

<main class="text-center mt-10">
	<h1>{ about }</h1>
	<p class="text-2xl">Hola, { name }</p>
	<button on:click={irInicio} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-3">Ir a la página principal</button>
</main>
