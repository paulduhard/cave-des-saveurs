import 'dotenv/config';
import * as prismic from '@prismicio/client';

import { repositoryName } from './slicemachine.config.json';

const writeClient = prismic.createWriteClient(repositoryName, {
	writeToken: process.env.PRISMIC_WRITE_TOKEN!
});

const migration = prismic.createMigration();

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-henri-milan',
		data: {
			domaine: 'Domaine Henri Milan',
			description: []
		}
	},
	'Domaine Henri Milan'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-revelette',
		data: {
			domaine: 'Château Revelette',
			description: []
		}
	},
	'Château Revelette'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'valerie-courreges',
		data: {
			domaine: 'Valérie Courrèges',
			description: []
		}
	},
	'Valérie Courrèges'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-lisle-saint-pierre',
		data: {
			domaine: "Domaine de l'Isle Saint Pierre",
			description: []
		}
	},
	"Domaine de l'Isle Saint Pierre"
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-la-begude',
		data: {
			domaine: 'Domaine de La Bégude',
			description: []
		}
	},
	'Domaine de La Bégude'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-beaujeu',
		data: {
			domaine: 'Domaine de Beaujeu',
			description: []
		}
	},
	'Domaine de Beaujeu'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-trevallon',
		data: {
			domaine: 'Domaine de Trévallon',
			description: []
		}
	},
	'Domaine de Trévallon'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-du-grand-fontanille',
		data: {
			domaine: 'Domaine du Grand Fontanille',
			description: []
		}
	},
	'Domaine du Grand Fontanille'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-dominique-hauvette',
		data: {
			domaine: 'Domaine Dominique Hauvette',
			description: []
		}
	},
	'Domaine Dominique Hauvette'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-lauzieres',
		data: {
			domaine: 'Domaine de Lauzières',
			description: []
		}
	},
	'Domaine de Lauzières'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'mas-de-gourgonnier',
		data: {
			domaine: 'Mas de Gourgonnier',
			description: []
		}
	},
	'Mas de Gourgonnier'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'mas-sainte-berthe',
		data: {
			domaine: 'Mas Sainte Berthe',
			description: []
		}
	},
	'Mas Sainte Berthe'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-dal-canto',
		data: {
			domaine: 'Domaine Dal Canto',
			description: []
		}
	},
	'Domaine Dal Canto'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-la-vallongue',
		data: {
			domaine: 'Domaine de La Vallongue',
			description: []
		}
	},
	'Domaine de La Vallongue'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-des-terres-blanches',
		data: {
			domaine: 'Domaine des Terres Blanches',
			description: []
		}
	},
	'Domaine des Terres Blanches'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-sulauze',
		data: {
			domaine: 'Domaine de Sulauze',
			description: []
		}
	},
	'Domaine de Sulauze'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-minna',
		data: {
			domaine: 'Domaine Minna',
			description: []
		}
	},
	'Domaine Minna'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-simone',
		data: {
			domaine: 'Château Simone',
			description: []
		}
	},
	'Château Simone'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-du-paternel',
		data: {
			domaine: 'Domaine du Paternel',
			description: []
		}
	},
	'Domaine du Paternel'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-tempier',
		data: {
			domaine: 'Domaine Tempier',
			description: []
		}
	},
	'Domaine Tempier'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-de-roquefort',
		data: {
			domaine: 'Château de Roquefort',
			description: []
		}
	},
	'Château de Roquefort'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-rimauresq',
		data: {
			domaine: 'Domaine de Rimauresq',
			description: []
		}
	},
	'Domaine de Rimauresq'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'clos-cibonne',
		data: {
			domaine: 'Clos Cibonne',
			description: []
		}
	},
	'Clos Cibonne'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-turenne',
		data: {
			domaine: 'Domaine Turenne',
			description: []
		}
	},
	'Domaine Turenne'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-nicolas-mariotti-bindi',
		data: {
			domaine: 'Domaine Nicolas Mariotti Bindi',
			description: []
		}
	},
	'Domaine Nicolas Mariotti Bindi'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-vaccelli',
		data: {
			domaine: 'Domaine Vaccelli',
			description: []
		}
	},
	'Domaine Vaccelli'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'clos-canarelli',
		data: {
			domaine: 'Clos Canarelli',
			description: []
		}
	},
	'Clos Canarelli'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-des-celestes',
		data: {
			domaine: 'Domaine des Célestes',
			description: []
		}
	},
	'Domaine des Célestes'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-antoine-armanet',
		data: {
			domaine: 'Domaine Antoine Armanet',
			description: []
		}
	},
	'Domaine Antoine Armanet'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-rapatel',
		data: {
			domaine: 'Domaine de Rapatel',
			description: []
		}
	},
	'Domaine de Rapatel'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-des-maravilhas',
		data: {
			domaine: 'Domaine des Maravilhas',
			description: []
		}
	},
	'Domaine des Maravilhas'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-raymond-usseglio',
		data: {
			domaine: 'Domaine Raymond Usseglio',
			description: []
		}
	},
	'Domaine Raymond Usseglio'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-jean-royer',
		data: {
			domaine: 'Domaine Jean Royer',
			description: []
		}
	},
	'Domaine Jean Royer'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'clos-des-mourres',
		data: {
			domaine: 'Clos des Mourres',
			description: []
		}
	},
	'Clos des Mourres'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-dourea',
		data: {
			domaine: "Domaine d'Ouréa",
			description: []
		}
	},
	"Domaine d'Ouréa"
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'lionel-audouin',
		data: {
			domaine: 'Lionel Audouin',
			description: []
		}
	},
	'Lionel Audouin'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-wilfried',
		data: {
			domaine: 'Domaine Wilfried',
			description: []
		}
	},
	'Domaine Wilfried'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-roucas-toumba',
		data: {
			domaine: 'Domaine Roucas Toumba',
			description: []
		}
	},
	'Domaine Roucas Toumba'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-des-tours',
		data: {
			domaine: 'Château des Tours',
			description: []
		}
	},
	'Château des Tours'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'campagne-sarriere',
		data: {
			domaine: 'Campagne Sarrière',
			description: []
		}
	},
	'Campagne Sarrière'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'les-champs-delicieux',
		data: {
			domaine: 'Les Champs Délicieux',
			description: []
		}
	},
	'Les Champs Délicieux'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-claudine-vigne',
		data: {
			domaine: 'Domaine Claudine Vigne',
			description: []
		}
	},
	'Domaine Claudine Vigne'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-gournier',
		data: {
			domaine: 'Domaine de Gournier',
			description: []
		}
	},
	'Domaine de Gournier'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-des-sauvaire',
		data: {
			domaine: 'Domaine des Sauvaire',
			description: []
		}
	},
	'Domaine des Sauvaire'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-du-grand-prieure',
		data: {
			domaine: 'Domaine du Grand Prieuré',
			description: []
		}
	},
	'Domaine du Grand Prieuré'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-chamfort',
		data: {
			domaine: 'Domaine Chamfort',
			description: []
		}
	},
	'Domaine Chamfort'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-la-celestiere',
		data: {
			domaine: 'Domaine de la Célèstière',
			description: []
		}
	},
	'Domaine de la Célèstière'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-villeneuve',
		data: {
			domaine: 'Domaine de Villeneuve',
			description: []
		}
	},
	'Domaine de Villeneuve'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-de-fonsalette',
		data: {
			domaine: 'Château de Fonsalette',
			description: []
		}
	},
	'Château de Fonsalette'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'terre-des-chardons',
		data: {
			domaine: 'Terre des Chardons',
			description: []
		}
	},
	'Terre des Chardons'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-belle-dargence',
		data: {
			domaine: "Domaine Belle d'Argence",
			description: []
		}
	},
	"Domaine Belle d'Argence"
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-beaubois',
		data: {
			domaine: 'Château Beaubois',
			description: []
		}
	},
	'Château Beaubois'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'clos-des-papes',
		data: {
			domaine: 'Clos des Papes',
			description: []
		}
	},
	'Clos des Papes'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-de-beaucastel',
		data: {
			domaine: 'Château de Beaucastel',
			description: []
		}
	},
	'Château de Beaucastel'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-rayas',
		data: {
			domaine: 'Château Rayas',
			description: []
		}
	},
	'Château Rayas'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-la-perdriere',
		data: {
			domaine: 'Domaine de la Perdrière',
			description: []
		}
	},
	'Domaine de la Perdrière'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-du-sang-des-cailloux',
		data: {
			domaine: 'Domaine du Sang des Cailloux',
			description: []
		}
	},
	'Domaine du Sang des Cailloux'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-la-roubine',
		data: {
			domaine: 'Domaine de la Roubine',
			description: []
		}
	},
	'Domaine de la Roubine'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-martinelle',
		data: {
			domaine: 'Domaine Martinelle',
			description: []
		}
	},
	'Domaine Martinelle'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-coteaux-des-travers',
		data: {
			domaine: 'Domaine Coteaux des Travers',
			description: []
		}
	},
	'Domaine Coteaux des Travers'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-le-novi',
		data: {
			domaine: 'Domaine Le Novi',
			description: []
		}
	},
	'Domaine Le Novi'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'mas-de-libian',
		data: {
			domaine: 'Mas de Libian',
			description: []
		}
	},
	'Mas de Libian'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-des-quatre-vents',
		data: {
			domaine: 'Domaine des Quatre Vents',
			description: []
		}
	},
	'Domaine des Quatre Vents'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-bernard-gripa',
		data: {
			domaine: 'Domaine Bernard Gripa',
			description: []
		}
	},
	'Domaine Bernard Gripa'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-du-coulet',
		data: {
			domaine: 'Domaine du Coulet',
			description: []
		}
	},
	'Domaine du Coulet'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'clos-de-la-bonnette',
		data: {
			domaine: 'Clos de La Bonnette',
			description: []
		}
	},
	'Clos de La Bonnette'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-lionel-faury',
		data: {
			domaine: 'Domaine Lionel Faury',
			description: []
		}
	},
	'Domaine Lionel Faury'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-laurent-fayolle',
		data: {
			domaine: 'Domaine Laurent Fayolle',
			description: []
		}
	},
	'Domaine Laurent Fayolle'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-pierre-gonon',
		data: {
			domaine: 'Domaine Pierre Gonon',
			description: []
		}
	},
	'Domaine Pierre Gonon'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-saladin',
		data: {
			domaine: 'Domaine Saladin',
			description: []
		}
	},
	'Domaine Saladin'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-gramenon',
		data: {
			domaine: 'Domaine Gramenon',
			description: []
		}
	},
	'Domaine Gramenon'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-lionnet',
		data: {
			domaine: 'Domaine Lionnet',
			description: []
		}
	},
	'Domaine Lionnet'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'la-ferme-des-sept-lunes',
		data: {
			domaine: 'La Ferme des Sept Lunes',
			description: []
		}
	},
	'La Ferme des Sept Lunes'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-georges-vernay',
		data: {
			domaine: 'Domaine Georges Vernay',
			description: []
		}
	},
	'Domaine Georges Vernay'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-yohann-moreno',
		data: {
			domaine: 'Domaine Yohann Moreno',
			description: []
		}
	},
	'Domaine Yohann Moreno'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-ledogar',
		data: {
			domaine: 'Domaine Ledogar',
			description: []
		}
	},
	'Domaine Ledogar'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-maxime-magnon',
		data: {
			domaine: 'Domaine Maxime Magnon',
			description: []
		}
	},
	'Domaine Maxime Magnon'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-les-enfants-sauvages',
		data: {
			domaine: 'Domaine les Enfants Sauvages',
			description: []
		}
	},
	'Domaine les Enfants Sauvages'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-sauta-roc',
		data: {
			domaine: 'Domaine Sauta Roc',
			description: []
		}
	},
	'Domaine Sauta Roc'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-nicolas-senlanne',
		data: {
			domaine: 'Domaine Nicolas Senlanne',
			description: []
		}
	},
	'Domaine Nicolas Senlanne'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-peyre-rose',
		data: {
			domaine: 'Domaine Peyre Rose',
			description: []
		}
	},
	'Domaine Peyre Rose'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-clovallon',
		data: {
			domaine: 'Domaine de Clovallon',
			description: []
		}
	},
	'Domaine de Clovallon'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-jean-marie-rimbert',
		data: {
			domaine: 'Domaine Jean Marie Rimbert',
			description: []
		}
	},
	'Domaine Jean Marie Rimbert'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-canet-valette',
		data: {
			domaine: 'Domaine Canet Valette',
			description: []
		}
	},
	'Domaine Canet Valette'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-etienne-fort',
		data: {
			domaine: 'Domaine Etienne Fort',
			description: []
		}
	},
	'Domaine Etienne Fort'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'mas-des-agrunelles',
		data: {
			domaine: 'Mas des Agrunelles',
			description: []
		}
	},
	'Mas des Agrunelles'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-cassagnes-et-vitailles',
		data: {
			domaine: 'Domaine Cassagnes et Vitailles',
			description: []
		}
	},
	'Domaine Cassagnes et Vitailles'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'clos-des-reboussiers',
		data: {
			domaine: 'Clos des Reboussiers',
			description: []
		}
	},
	'Clos des Reboussiers'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-alexandra-et-olivier-mavit',
		data: {
			domaine: 'Domaine Alexandra et Olivier Mavit',
			description: []
		}
	},
	'Domaine Alexandra et Olivier Mavit'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-inebriati',
		data: {
			domaine: 'Domaine Inebriati',
			description: []
		}
	},
	'Domaine Inebriati'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'mas-du-chene',
		data: {
			domaine: 'Mas du Chêne',
			description: []
		}
	},
	'Mas du Chêne'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'mas-de-la-font-ronde',
		data: {
			domaine: 'Mas de la Font Ronde',
			description: []
		}
	},
	'Mas de la Font Ronde'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'roc-danglade',
		data: {
			domaine: "Roc d'Anglade",
			description: []
		}
	},
	"Roc d'Anglade"
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-la-terrasse-delise',
		data: {
			domaine: "Domaine La Terrasse d'Elise",
			description: []
		}
	},
	"Domaine La Terrasse d'Elise"
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'mas-de-daumas-gassac',
		data: {
			domaine: 'Mas de Daumas Gassac',
			description: []
		}
	},
	'Mas de Daumas Gassac'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-la-grange-des-peres',
		data: {
			domaine: 'Domaine de La Grange des Pères',
			description: []
		}
	},
	'Domaine de La Grange des Pères'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'mas-des-chimeres',
		data: {
			domaine: 'Mas des Chimères',
			description: []
		}
	},
	'Mas des Chimères'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'hors-piste',
		data: {
			domaine: 'Hors Piste',
			description: []
		}
	},
	'Hors Piste'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'clos-des-calades',
		data: {
			domaine: 'Clos des Calades',
			description: []
		}
	},
	'Clos des Calades'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-du-prieure-saint-jean-de-bebian',
		data: {
			domaine: 'Domaine du Prieuré Saint Jean de Bébian',
			description: []
		}
	},
	'Domaine du Prieuré Saint Jean de Bébian'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-descattes',
		data: {
			domaine: "Domaine d'Escattes",
			description: []
		}
	},
	"Domaine d'Escattes"
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'mas-foulaquier',
		data: {
			domaine: 'Mas Foulaquier',
			description: []
		}
	},
	'Mas Foulaquier'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'clos-marie',
		data: {
			domaine: 'Clos Marie',
			description: []
		}
	},
	'Clos Marie'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-fontanes',
		data: {
			domaine: 'Château Fontanès',
			description: []
		}
	},
	'Château Fontanès'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'clos-constantin',
		data: {
			domaine: 'Clos Constantin',
			description: []
		}
	},
	'Clos Constantin'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'mas-jullien',
		data: {
			domaine: 'Mas Jullien',
			description: []
		}
	},
	'Mas Jullien'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'mas-dalezon',
		data: {
			domaine: "Mas d'Alézon",
			description: []
		}
	},
	"Mas d'Alézon"
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-leon-barral',
		data: {
			domaine: 'Domaine Léon Barral',
			description: []
		}
	},
	'Domaine Léon Barral'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-la-maurine',
		data: {
			domaine: 'Domaine de la Maurine',
			description: []
		}
	},
	'Domaine de la Maurine'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-benjamin-taillandier',
		data: {
			domaine: 'Domaine Benjamin Taillandier',
			description: []
		}
	},
	'Domaine Benjamin Taillandier'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-du-grand-guilhem',
		data: {
			domaine: 'Domaine du Grand Guilhem',
			description: []
		}
	},
	'Domaine du Grand Guilhem'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-recerca',
		data: {
			domaine: 'Domaine Recerca',
			description: []
		}
	},
	'Domaine Recerca'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-francois-jaubert',
		data: {
			domaine: 'Domaine François Jaubert',
			description: []
		}
	},
	'Domaine François Jaubert'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-gauby',
		data: {
			domaine: 'Domaine Gauby',
			description: []
		}
	},
	'Domaine Gauby'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-danjou-banessy',
		data: {
			domaine: 'Domaine Danjou Banessy',
			description: []
		}
	},
	'Domaine Danjou Banessy'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-vaquer',
		data: {
			domaine: 'Domaine Vaquer',
			description: []
		}
	},
	'Domaine Vaquer'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-la-preceptorie',
		data: {
			domaine: 'Domaine de La Préceptorie',
			description: []
		}
	},
	'Domaine de La Préceptorie'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-la-rectorie',
		data: {
			domaine: 'Domaine de La Rectorie',
			description: []
		}
	},
	'Domaine de La Rectorie'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-tour-le-pin',
		data: {
			domaine: 'Château Tour Le Pin',
			description: []
		}
	},
	'Château Tour Le Pin'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-beaulieu',
		data: {
			domaine: 'Château Beaulieu',
			description: []
		}
	},
	'Château Beaulieu'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-potensac',
		data: {
			domaine: 'Château Potensac',
			description: []
		}
	},
	'Château Potensac'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-ladouys',
		data: {
			domaine: 'Château Ladouys',
			description: []
		}
	},
	'Château Ladouys'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-lacoste-borie',
		data: {
			domaine: 'Château Lacoste Borie',
			description: []
		}
	},
	'Château Lacoste Borie'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-prieure-lichine',
		data: {
			domaine: 'Château Prieuré Lichine',
			description: []
		}
	},
	'Château Prieuré Lichine'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-citran',
		data: {
			domaine: 'Château Citran',
			description: []
		}
	},
	'Château Citran'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-gombaude-guillot',
		data: {
			domaine: 'Château Gombaude Guillot',
			description: []
		}
	},
	'Château Gombaude Guillot'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-bernard-moreau',
		data: {
			domaine: 'Domaine Bernard Moreau',
			description: []
		}
	},
	'Domaine Bernard Moreau'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-fanny-sabre',
		data: {
			domaine: 'Domaine Fanny Sabre',
			description: []
		}
	},
	'Domaine Fanny Sabre'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-vrignaud',
		data: {
			domaine: 'Domaine Vrignaud',
			description: []
		}
	},
	'Domaine Vrignaud'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-de-beru',
		data: {
			domaine: 'Château de Béru',
			description: []
		}
	},
	'Château de Béru'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-rene-bouvier',
		data: {
			domaine: 'Domaine René Bouvier',
			description: []
		}
	},
	'Domaine René Bouvier'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-la-vougeraie',
		data: {
			domaine: 'Domaine de La Vougeraie',
			description: []
		}
	},
	'Domaine de La Vougeraie'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-pierre-laurent',
		data: {
			domaine: 'Domaine Pierre Laurent',
			description: []
		}
	},
	'Domaine Pierre Laurent'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-maillard',
		data: {
			domaine: 'Domaine Maillard',
			description: []
		}
	},
	'Domaine Maillard'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-jacques-prieur',
		data: {
			domaine: 'Domaine Jacques Prieur',
			description: []
		}
	},
	'Domaine Jacques Prieur'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-michel-juillot',
		data: {
			domaine: 'Domaine Michel Juillot',
			description: []
		}
	},
	'Domaine Michel Juillot'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-louis-chenu',
		data: {
			domaine: 'Domaine Louis Chenu',
			description: []
		}
	},
	'Domaine Louis Chenu'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-comte-armand',
		data: {
			domaine: 'Domaine Comte Armand',
			description: []
		}
	},
	'Domaine Comte Armand'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-pierre-matrot',
		data: {
			domaine: 'Domaine Pierre Matrot',
			description: []
		}
	},
	'Domaine Pierre Matrot'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-des-rouges-queues',
		data: {
			domaine: 'Domaine des Rouges Queues',
			description: []
		}
	},
	'Domaine des Rouges Queues'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-jean-marie-bouzereau',
		data: {
			domaine: 'Domaine Jean Marie Bouzereau',
			description: []
		}
	},
	'Domaine Jean Marie Bouzereau'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-pierre-yves-colin-morey',
		data: {
			domaine: 'Domaine Pierre Yves Colin Morey',
			description: []
		}
	},
	'Domaine Pierre Yves Colin Morey'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-caroline-morey',
		data: {
			domaine: 'Domaine Caroline Morey',
			description: []
		}
	},
	'Domaine Caroline Morey'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-dupre',
		data: {
			domaine: 'Domaine Dupré',
			description: []
		}
	},
	'Domaine Dupré'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'les-vignes-mouton',
		data: {
			domaine: 'Les Vignes Mouton',
			description: []
		}
	},
	'Les Vignes Mouton'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-de-pouilly',
		data: {
			domaine: 'Château de Pouilly',
			description: []
		}
	},
	'Château de Pouilly'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-marcel-lapierre',
		data: {
			domaine: 'Domaine Marcel Lapierre',
			description: []
		}
	},
	'Domaine Marcel Lapierre'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-keke-descombes',
		data: {
			domaine: 'Domaine Kéké Descombes',
			description: []
		}
	},
	'Domaine Kéké Descombes'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-alex-foillard',
		data: {
			domaine: 'Domaine Alex Foillard',
			description: []
		}
	},
	'Domaine Alex Foillard'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-karim-vionnet',
		data: {
			domaine: 'Domaine Karim Vionnet',
			description: []
		}
	},
	'Domaine Karim Vionnet'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-jean-paul-et-charly-thevenet',
		data: {
			domaine: 'Domaine Jean Paul et Charly Thévenet',
			description: []
		}
	},
	'Domaine Jean Paul et Charly Thévenet'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-bonnet-cotton',
		data: {
			domaine: 'Domaine Bonnet Cotton',
			description: []
		}
	},
	'Domaine Bonnet Cotton'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-lecu',
		data: {
			domaine: "Domaine de l'Ecu",
			description: []
		}
	},
	"Domaine de l'Ecu"
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-lr',
		data: {
			domaine: "Domaine de l'R",
			description: []
		}
	},
	"Domaine de l'R"
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-jean-francois-merieau',
		data: {
			domaine: 'Domaine Jean François Mérieau',
			description: []
		}
	},
	'Domaine Jean François Mérieau'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-didier-daguenau',
		data: {
			domaine: 'Domaine Didier Daguenau',
			description: []
		}
	},
	'Domaine Didier Daguenau'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'la-ferme-du-mont-benault',
		data: {
			domaine: 'La Ferme du Mont Benault',
			description: []
		}
	},
	'La Ferme du Mont Benault'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-des-hautes-noelles',
		data: {
			domaine: 'Domaine des Hautes Noëlles',
			description: []
		}
	},
	'Domaine des Hautes Noëlles'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'vincent-giraudon-et-romain-paire',
		data: {
			domaine: 'Vincent Giraudon et Romain Paire',
			description: []
		}
	},
	'Vincent Giraudon et Romain Paire'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-des-terres-docres',
		data: {
			domaine: "Domaine des Terres d'Ocres",
			description: []
		}
	},
	"Domaine des Terres d'Ocres"
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-pierre-martin',
		data: {
			domaine: 'Domaine Pierre Martin',
			description: []
		}
	},
	'Domaine Pierre Martin'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-la-clef-du-recit',
		data: {
			domaine: 'Domaine La Clef du Récit',
			description: []
		}
	},
	'Domaine La Clef du Récit'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-henri-pelle',
		data: {
			domaine: 'Domaine Henri Pellé',
			description: []
		}
	},
	'Domaine Henri Pellé'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-montcy',
		data: {
			domaine: 'Domaine de Montcy',
			description: []
		}
	},
	'Domaine de Montcy'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-le-rocher-des-violettes',
		data: {
			domaine: 'Domaine Le Rocher des Violettes',
			description: []
		}
	},
	'Domaine Le Rocher des Violettes'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-mathieu-cosme',
		data: {
			domaine: 'Domaine Mathieu Cosme',
			description: []
		}
	},
	'Domaine Mathieu Cosme'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-catherine-et-pierre-breton',
		data: {
			domaine: 'Domaine Catherine et Pierre Breton',
			description: []
		}
	},
	'Domaine Catherine et Pierre Breton'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-du-petit-saint-vincent',
		data: {
			domaine: 'Domaine du Petit Saint Vincent',
			description: []
		}
	},
	'Domaine du Petit Saint Vincent'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-des-roches-neuves',
		data: {
			domaine: 'Domaine des Roches Neuves',
			description: []
		}
	},
	'Domaine des Roches Neuves'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-luneau-papin',
		data: {
			domaine: 'Domaine Luneau Papin',
			description: []
		}
	},
	'Domaine Luneau Papin'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-josmeyer',
		data: {
			domaine: 'Domaine Josmeyer',
			description: []
		}
	},
	'Domaine Josmeyer'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-trimbach',
		data: {
			domaine: 'Domaine Trimbach',
			description: []
		}
	},
	'Domaine Trimbach'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-des-ronces',
		data: {
			domaine: 'Domaine des Ronces',
			description: []
		}
	},
	'Domaine des Ronces'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-eric-thill',
		data: {
			domaine: 'Domaine Eric Thill',
			description: []
		}
	},
	'Domaine Eric Thill'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-la-tournelle',
		data: {
			domaine: 'Domaine de La Tournelle',
			description: []
		}
	},
	'Domaine de La Tournelle'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-camille-et-mathieu-apffel',
		data: {
			domaine: 'Domaine Camille et Mathieu Apffel',
			description: []
		}
	},
	'Domaine Camille et Mathieu Apffel'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-gilles-berlioz',
		data: {
			domaine: 'Domaine Gilles Berlioz',
			description: []
		}
	},
	'Domaine Gilles Berlioz'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-cosse-et-maisoneuve',
		data: {
			domaine: 'Domaine Cosse et Maisoneuve',
			description: []
		}
	},
	'Domaine Cosse et Maisoneuve'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-du-tariquet',
		data: {
			domaine: 'Domaine du Tariquet',
			description: []
		}
	},
	'Domaine du Tariquet'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-plageoles',
		data: {
			domaine: 'Domaine Plageoles',
			description: []
		}
	},
	'Domaine Plageoles'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-lancienne-cure',
		data: {
			domaine: "Domaine de L'Ancienne Cure",
			description: []
		}
	},
	"Domaine de L'Ancienne Cure"
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-mouthes-le-bian',
		data: {
			domaine: 'Domaine Mouthes Le Bian',
			description: []
		}
	},
	'Domaine Mouthes Le Bian'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'chateau-montus',
		data: {
			domaine: 'Château Montus',
			description: []
		}
	},
	'Château Montus'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-de-souch',
		data: {
			domaine: 'Domaine de Souch',
			description: []
		}
	},
	'Domaine de Souch'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'domaine-bordaxuria',
		data: {
			domaine: 'Domaine Bordaxuria',
			description: []
		}
	},
	'Domaine Bordaxuria'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'denis-lallement',
		data: {
			domaine: 'Denis Lallement',
			description: []
		}
	},
	'Denis Lallement'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'remy-massin',
		data: {
			domaine: 'Rémy Massin',
			description: []
		}
	},
	'Rémy Massin'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'jean-marie-goulard',
		data: {
			domaine: 'Jean Marie Goulard',
			description: []
		}
	},
	'Jean Marie Goulard'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'pertois-moriset',
		data: {
			domaine: 'Pertois Moriset',
			description: []
		}
	},
	'Pertois Moriset'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'fleury',
		data: {
			domaine: 'Fleury',
			description: []
		}
	},
	'Fleury'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'hugues-godme',
		data: {
			domaine: 'Hugues Godmé',
			description: []
		}
	},
	'Hugues Godmé'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'laherte-freres',
		data: {
			domaine: 'Laherte Frères',
			description: []
		}
	},
	'Laherte Frères'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'alexandre-bonnet',
		data: {
			domaine: 'Alexandre Bonnet',
			description: []
		}
	},
	'Alexandre Bonnet'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'deutz',
		data: {
			domaine: 'Deutz',
			description: []
		}
	},
	'Deutz'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'francoise-bedel',
		data: {
			domaine: 'Françoise Bedel',
			description: []
		}
	},
	'Françoise Bedel'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'lelarge-pugeot',
		data: {
			domaine: 'Lelarge Pugeot',
			description: []
		}
	},
	'Lelarge Pugeot'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'louis-roederer',
		data: {
			domaine: 'Louis Roederer',
			description: []
		}
	},
	'Louis Roederer'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'valerie-frison',
		data: {
			domaine: 'Valérie Frison',
			description: []
		}
	},
	'Valérie Frison'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'andre-bergere',
		data: {
			domaine: 'André Bergère',
			description: []
		}
	},
	'André Bergère'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'francis-boulard',
		data: {
			domaine: 'Francis Boulard',
			description: []
		}
	},
	'Francis Boulard'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'ruinart',
		data: {
			domaine: 'Ruinart',
			description: []
		}
	},
	'Ruinart'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'egly-ouriet',
		data: {
			domaine: 'Egly Ouriet',
			description: []
		}
	},
	'Egly Ouriet'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'jacquesson',
		data: {
			domaine: 'Jacquesson',
			description: []
		}
	},
	'Jacquesson'
);

migration.createDocument(
	{
		type: 'domaine',
		lang: 'fr-fr',
		uid: 'vouette-et-sorbee',
		data: {
			domaine: 'Vouette et Sorbée',
			description: []
		}
	},
	'Vouette et Sorbée'
);

await writeClient.migrate(migration, {
	reporter: (event) => console.log(event)
});
