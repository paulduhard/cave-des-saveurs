import { createClient } from '$lib/prismicio';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
	const client = createClient({ fetch, cookies });
	const cavePage = await client.getSingle('cave');

	return {
		cavePage
	};
};
