import 'dotenv/config';
import * as prismic from '@prismicio/client';

import { repositoryName } from './slicemachine.config.json';

const writeClient = prismic.createWriteClient(repositoryName, {
	writeToken: process.env.PRISMIC_WRITE_TOKEN!
});

const migration = prismic.createMigration();

// This is an example
migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'vin-de-france',
		data: {
			appellation: 'Vin de France',
			description: []
		}
	},
	'Vin de France'
);

await writeClient.migrate(migration, {
	reporter: (event) => console.log(event)
});
