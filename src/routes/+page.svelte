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

<div class="columns">
    <div class="column is-11">
        <input class="input" bind:value={search_name} on:input={searchCharacter} type="search" placeholder="Buscar">
    </div>
    <div class="column">
        <button class="button is-primary" on:click={searchCharacter}><i class="fa-solid fa-search"></i> Buscar</button>
    </div>
</div>

<div class="columns is-multiline">
    {#if characters.length > 0}
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

                            <a href="/character/{character.id}" class="button is-primary is-fullwidth">Ver más</a>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    {:else}
        <div class="column is-12">
            <div class="card">
                <div class="card-content">
                    <div class="content">
                        <p>No hay resultados</p>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>