import type { PageLoad } from './$types';
import { currentUser, pb } from '$lib/pocketbase';

export const load = (async ({ params }) => {
	try {
		const record = await pb.collection('notes').getOne(params.id, { expand: 'user' });
		return {
			success: !!record.id,
			record
		};
	} catch (e) {
		return {
			success: false
		};
	}
}) satisfies PageLoad;
