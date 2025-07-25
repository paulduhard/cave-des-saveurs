import * as prismic from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/svelte/kit';
import config from '../../slicemachine.config.json';

/**
 * The project's Prismic repository name.
 */
export const repositoryName = import.meta.env.VITE_PRISMIC_ENVIRONMENT || config.repositoryName;

import type { ClientConfig } from '@prismicio/client';

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: ClientConfig['routes'] = [
	{
		type: 'page',
		uid: 'home',
		path: '/'
	},
	{
		type: 'page',
		path: '/:uid'
	},
	{
		type: 'cave',
		path: '/cave/:uid'
	},
	{
		type: 'epicerie',
		path: '/epicerie'
	},
	{
		type: 'vin',
		path: '/vin/:uid'
	}
];

import type { CreateClientConfig } from '@prismicio/svelte/kit';

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 */
export const createClient = ({ cookies = undefined, ...config }: CreateClientConfig = {}) => {
	const client = prismic.createClient(repositoryName, {
		routes,
		...config
	});

	enableAutoPreviews({ client, cookies });

	return client;
};
