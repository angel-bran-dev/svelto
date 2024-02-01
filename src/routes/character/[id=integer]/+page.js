import { api } from '$lib/index';

/** import('./$types.js').PageLoadData */
export async function load({ fetch, params }) {
    const res = await fetch(`${api}/character/${params.id}`);
    const data = await res.json();

	console.log(data);

    return { character: data };
}
