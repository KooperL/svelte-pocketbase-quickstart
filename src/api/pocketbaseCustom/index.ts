import axios from 'axios';
import { currentUser } from '$lib/pocketbase';
import { env } from '$env/dynamic/public';

const HOST = env.PUBLIC_POCKETBASE_URL;
export const pocketbaseCustomEndpoints = {
	share: HOST + '/api/custom/post/:postId/share'
} as const;

interface ApiData {
	url?: [
		{
			key: string;
			value: string;
		}
	];
	payload?: any;
	method: string;
}

export async function fetchCustomEndpoint(endpoint: string, data: ApiData) {
	try {
		let token;
		currentUser.subscribe((value) => {
			token = value?.token;
		});

		let path = endpoint.toString();
		if (data.url) {
			for (let item of data.url) {
				path = path.replace(':' + item.key, item.value);
			}
		}
		const res = await axios({
			method: data.method ?? 'post',
			url: path,
			headers: {
				Authorization: token
			},
			data: data.payload
		});
		return res;
	} catch (e) {
		console.error(e);
		return e;
	}
}

export default fetchCustomEndpoint;
