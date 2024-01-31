<script>
// @ts-nocheck
import { onMount } from 'svelte';

let url = import.meta.env.VITE_BASE_URL;
let search_name = '';
let characters = [];

async function searchCharacter() {
    const res = await fetch(url + '/character?name=' + search_name);
    const data = await res.json();
    characters = data.results;
}

onMount(async () => {
    const res = await fetch(url + '/character');
    const data = await res.json();
    characters = data.results;
});

</script>

<div class="columns">
    <div class="column is-11">
        <input class="input" bind:value={search_name} on:keyup={searchCharacter} type="search" placeholder="Buscar">
    </div>
    <div class="column">
        <button class="button is-primary" on:click={searchCharacter}>Buscar</button>
    </div>
</div>

<div class="columns is-multiline">
    {#each characters as character}
        <div class="column is-2">
            <div class="card">
                <div class="card-image">
                    <figure class="image is-4by5">
                        <img src="{character.image}" alt="{character.name}">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="content">
                        <p class="is-size-5">{character.name}</p>
                        <p class="is-size-6"><span>{character.species}</span> - <span class={character.status === 'Alive' ? 'has-text-success' : 'has-text-danger'}>{character.status}</span></p>
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>