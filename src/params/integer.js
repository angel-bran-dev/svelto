/** @type { import('@sveltejs/kit').ParamMatcher } */
export function match(param) {
	return /^[1-9]\d*$/.test(param);
}
