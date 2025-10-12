export const prerender = 'auto';

export async function load({ params, parent }) {
	// Get all data from parent layout
	const parentData = await parent();

	const uid = params.uid;
	const currentRegion = parentData.regions?.find((r: any) => r.uid === uid);

	// All data comes from parent, just pass it through with current region info
	return {
		...parentData,
		currentRegion,
		uid
	};
}
