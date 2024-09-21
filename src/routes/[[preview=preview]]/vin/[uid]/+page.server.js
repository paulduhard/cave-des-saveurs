import { createClient } from '$lib/prismicio';

export async function load({ params, fetch, cookies }) {
	const client = createClient({ fetch, cookies });

	const page = await client.getByUID('vin', params.uid);

	return {
		page
	};
}

export async function entries() {
	const client = createClient();

	const pages = await client.getAllByType('vin');

	return pages.map((page) => {
		return { uid: page.uid };
	});
}
