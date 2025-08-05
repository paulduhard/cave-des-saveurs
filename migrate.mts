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
			description: [
				{
					type: 'paragraph',
					text: "Souple et libre, l'appellation Vin de France permet aux vignerons une grande créativité, affranchie des contraintes géographiques ou réglementaires d'autres labels. Elle rassemble des cuvées authentiques, souvent audacieuses, qui expriment pleinement le savoir-faire du vigneron et la personnalité du terroir. Cette liberté d'assemblage et de cépage favorise des profils variés, tantôt frais et fruités, tantôt plus complexes. Les vins peuvent provenir de n'importe quelle région de France, offrant ainsi une diversité et une accessibilité uniques.",
					spans: []
				}
			]
		}
	},
	'Vin de France'
);

await writeClient.migrate(migration, {
	reporter: (event) => console.log(event)
});
