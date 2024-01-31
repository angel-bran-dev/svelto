<script>
    /** @type {import('./$types').PageData} */
    export let data;

    const { character } = data;
    console.log(character);
</script>

<div class="container">
    <div class="card">
        <div class="columns">
            <div class="column is-4">
                <div class="card-image">
                    <figure class="image is-4by5">
                        <img src="{character.image}" alt="{character.name}">
                    </figure>
                </div>
            </div>
            <div class="column is-8">
                <div class="card-content">
                    <div class="content">
                        <p class="is-size-5">{character.name}</p>
                        <p class="is-size-6"><span>{character.species}</span> - <span class={character.status === 'Alive' ? 'has-text-success' : 'has-text-danger'}>{character.status}</span></p>

                        <p>Location: <a href="{`/location/${character.location.url.split('/').pop()}`}">{character.location.name}</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>