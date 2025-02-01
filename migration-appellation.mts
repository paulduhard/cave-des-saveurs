import 'dotenv/config';
import * as prismic from '@prismicio/client';

import { repositoryName } from './slicemachine.config.json';

const writeClient = prismic.createWriteClient(repositoryName, {
	writeToken: process.env.PRISMIC_WRITE_TOKEN!
});

const migration = prismic.createMigration();

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

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'igp-mediterranee',
		data: {
			appellation: 'IGP Méditerranée',
			description: []
		}
	},
	'IGP Méditerranée'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'igp-vin-de-pays-des-bouches-du-rhone',
		data: {
			appellation: 'IGP Vin de pays des Bouches du Rhône',
			description: []
		}
	},
	'IGP Vin de pays des Bouches du Rhône'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'igp-alpilles',
		data: {
			appellation: 'IGP Alpilles',
			description: []
		}
	},
	'IGP Alpilles'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-les-baux-de-provence',
		data: {
			appellation: 'AOP Les Baux de Provence',
			description: []
		}
	},
	'AOP Les Baux de Provence'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-coteaux-daix-en-provence',
		data: {
			appellation: 'AOP Coteaux d’Aix en Provence',
			description: []
		}
	},
	'AOP Coteaux d’Aix en Provence'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-palette',
		data: {
			appellation: 'AOP Palette',
			description: []
		}
	},
	'AOP Palette'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-cassis',
		data: {
			appellation: 'AOP Cassis',
			description: []
		}
	},
	'AOP Cassis'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-bandol',
		data: {
			appellation: 'AOP Bandol',
			description: []
		}
	},
	'AOP Bandol'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-cotes-de-provence',
		data: {
			appellation: 'AOP Côtes de Provence',
			description: []
		}
	},
	'AOP Côtes de Provence'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-patrimonio',
		data: {
			appellation: 'AOP Patrimonio',
			description: []
		}
	},
	'AOP Patrimonio'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-ajaccio',
		data: {
			appellation: 'AOP Ajaccio',
			description: []
		}
	},
	'AOP Ajaccio'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-figari',
		data: {
			appellation: 'AOP Figari',
			description: []
		}
	},
	'AOP Figari'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'igp-coteaux-du-pont-du-gard',
		data: {
			appellation: 'IGP Coteaux du pont du Gard',
			description: []
		}
	},
	'IGP Coteaux du pont du Gard'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'igp-cevennes',
		data: {
			appellation: 'IGP Cévennes',
			description: []
		}
	},
	'IGP Cévennes'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'igp-vaucluse',
		data: {
			appellation: 'IGP Vaucluse',
			description: []
		}
	},
	'IGP Vaucluse'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-cotes-du-rhone',
		data: {
			appellation: 'AOP Côtes du Rhône',
			description: []
		}
	},
	'AOP Côtes du Rhône'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-costieres-de-nimes',
		data: {
			appellation: 'AOP Costières de Nimes',
			description: []
		}
	},
	'AOP Costières de Nimes'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-clairette-de-bellegarde',
		data: {
			appellation: 'AOP Clairette de Bellegarde',
			description: []
		}
	},
	'AOP Clairette de Bellegarde'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-lirac',
		data: {
			appellation: 'AOP Lirac',
			description: []
		}
	},
	'AOP Lirac'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-laudun',
		data: {
			appellation: 'AOP Laudun',
			description: []
		}
	},
	'AOP Laudun'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-duche-duzes',
		data: {
			appellation: 'AOP Duché d’Uzès',
			description: []
		}
	},
	'AOP Duché d’Uzès'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-chateauneuf-du-pape',
		data: {
			appellation: 'AOP Châteauneuf du Pape',
			description: []
		}
	},
	'AOP Châteauneuf du Pape'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-vacqueyras',
		data: {
			appellation: 'AOP Vacqueyras',
			description: []
		}
	},
	'AOP Vacqueyras'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-gigondas',
		data: {
			appellation: 'AOP Gigondas',
			description: []
		}
	},
	'AOP Gigondas'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-sablet',
		data: {
			appellation: 'AOP Sablet',
			description: []
		}
	},
	'AOP Sablet'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-seguret',
		data: {
			appellation: 'AOP Séguret',
			description: []
		}
	},
	'AOP Séguret'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-ventoux',
		data: {
			appellation: 'AOP Ventoux',
			description: []
		}
	},
	'AOP Ventoux'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-beaumes-de-venise',
		data: {
			appellation: 'AOP Beaumes de Venise',
			description: []
		}
	},
	'AOP Beaumes de Venise'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-rasteau',
		data: {
			appellation: 'AOP Rasteau',
			description: []
		}
	},
	'AOP Rasteau'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-cairanne',
		data: {
			appellation: 'AOP Cairanne',
			description: []
		}
	},
	'AOP Cairanne'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-luberon',
		data: {
			appellation: 'AOP Lubéron',
			description: []
		}
	},
	'AOP Lubéron'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'igp-vin-de-pays-des-collines-rhodaniennes',
		data: {
			appellation: 'IGP Vin de pays des collines rhodaniennes',
			description: []
		}
	},
	'IGP Vin de pays des collines rhodaniennes'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'igp-vin-de-pays-de-lardeche',
		data: {
			appellation: 'IGP Vin de pays de l’Ardèche',
			description: []
		}
	},
	'IGP Vin de pays de l’Ardèche'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-cornas',
		data: {
			appellation: 'AOP Cornas',
			description: []
		}
	},
	'AOP Cornas'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-saint-joseph',
		data: {
			appellation: 'AOP Saint Joseph',
			description: []
		}
	},
	'AOP Saint Joseph'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-saint-peray',
		data: {
			appellation: 'AOP Saint Péray',
			description: []
		}
	},
	'AOP Saint Péray'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-crozes-hermitage',
		data: {
			appellation: 'AOP Crozes Hermitage',
			description: []
		}
	},
	'AOP Crozes Hermitage'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-hermitage',
		data: {
			appellation: 'AOP Hermitage',
			description: []
		}
	},
	'AOP Hermitage'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-cote-rotie',
		data: {
			appellation: 'AOP Côte Rôtie',
			description: []
		}
	},
	'AOP Côte Rôtie'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-condrieu',
		data: {
			appellation: 'AOP Condrieu',
			description: []
		}
	},
	'AOP Condrieu'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'igp-pays-du-gard',
		data: {
			appellation: 'IGP Pays du Gard',
			description: []
		}
	},
	'IGP Pays du Gard'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'igp-pays-dherault',
		data: {
			appellation: 'IGP Pays d’Hérault',
			description: []
		}
	},
	'IGP Pays d’Hérault'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'igp-saint-guilhem-le-desert',
		data: {
			appellation: 'IGP Saint Guilhem Le Désert',
			description: []
		}
	},
	'IGP Saint Guilhem Le Désert'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'igp-coteaux-du-salagou',
		data: {
			appellation: 'IGP Coteaux du Salagou',
			description: []
		}
	},
	'IGP Coteaux du Salagou'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'igp-cotes-de-thongue',
		data: {
			appellation: 'IGP Côtes de Thongue',
			description: []
		}
	},
	'IGP Côtes de Thongue'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-languedoc',
		data: {
			appellation: 'AOP Languedoc',
			description: []
		}
	},
	'AOP Languedoc'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-pic-saint-loup',
		data: {
			appellation: 'AOP Pic Saint Loup',
			description: []
		}
	},
	'AOP Pic Saint Loup'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-terrasses-du-larzac',
		data: {
			appellation: 'AOP Terrasses du Larzac',
			description: []
		}
	},
	'AOP Terrasses du Larzac'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-montpeyroux',
		data: {
			appellation: 'AOP Montpeyroux',
			description: []
		}
	},
	'AOP Montpeyroux'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-faugeres',
		data: {
			appellation: 'AOP Faugères',
			description: []
		}
	},
	'AOP Faugères'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-saint-chinian',
		data: {
			appellation: 'AOP Saint Chinian',
			description: []
		}
	},
	'AOP Saint Chinian'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-minervois',
		data: {
			appellation: 'AOP Minervois',
			description: []
		}
	},
	'AOP Minervois'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-corbieres',
		data: {
			appellation: 'AOP Corbières',
			description: []
		}
	},
	'AOP Corbières'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-fitou',
		data: {
			appellation: 'AOP Fitou',
			description: []
		}
	},
	'AOP Fitou'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'igp-cotes-catalanes',
		data: {
			appellation: 'IGP Côtes Catalanes',
			description: []
		}
	},
	'IGP Côtes Catalanes'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-cotes-du-roussillon',
		data: {
			appellation: 'AOP Côtes du Roussillon',
			description: []
		}
	},
	'AOP Côtes du Roussillon'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-maury',
		data: {
			appellation: 'AOP Maury',
			description: []
		}
	},
	'AOP Maury'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-collioure',
		data: {
			appellation: 'AOP Collioure',
			description: []
		}
	},
	'AOP Collioure'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-banyuls',
		data: {
			appellation: 'AOP Banyuls',
			description: []
		}
	},
	'AOP Banyuls'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-bordeaux',
		data: {
			appellation: 'AOP Bordeaux',
			description: []
		}
	},
	'AOP Bordeaux'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-medoc',
		data: {
			appellation: 'AOP Médoc',
			description: []
		}
	},
	'AOP Médoc'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-saint-estephe',
		data: {
			appellation: 'AOP Saint Estèphe',
			description: []
		}
	},
	'AOP Saint Estèphe'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-pauillac',
		data: {
			appellation: 'AOP Pauillac',
			description: []
		}
	},
	'AOP Pauillac'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-saint-julien',
		data: {
			appellation: 'AOP Saint Julien',
			description: []
		}
	},
	'AOP Saint Julien'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-margaux',
		data: {
			appellation: 'AOP Margaux',
			description: []
		}
	},
	'AOP Margaux'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-haut-medoc',
		data: {
			appellation: 'AOP Haut Médoc',
			description: []
		}
	},
	'AOP Haut Médoc'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-pessac-leognan',
		data: {
			appellation: 'AOP Pessac Léognan',
			description: []
		}
	},
	'AOP Pessac Léognan'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-pomerol',
		data: {
			appellation: 'AOP Pomerol',
			description: []
		}
	},
	'AOP Pomerol'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-saint-emilion',
		data: {
			appellation: 'AOP Saint Emilion',
			description: []
		}
	},
	'AOP Saint Emilion'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-sauternes',
		data: {
			appellation: 'AOP Sauternes',
			description: []
		}
	},
	'AOP Sauternes'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-bourgogne',
		data: {
			appellation: 'AOP Bourgogne',
			description: []
		}
	},
	'AOP Bourgogne'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-chablis',
		data: {
			appellation: 'AOP Chablis',
			description: []
		}
	},
	'AOP Chablis'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-saint-bris',
		data: {
			appellation: 'AOP Saint Bris',
			description: []
		}
	},
	'AOP Saint Bris'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-marsannay',
		data: {
			appellation: 'AOP Marsannay',
			description: []
		}
	},
	'AOP Marsannay'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-gevrey-chambertin',
		data: {
			appellation: 'AOP Gevrey Chambertin',
			description: []
		}
	},
	'AOP Gevrey Chambertin'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-charmes-chambertin-grand-cru',
		data: {
			appellation: 'AOP Charmes Chambertin Grand Cru',
			description: []
		}
	},
	'AOP Charmes Chambertin Grand Cru'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-morey-saint-denis',
		data: {
			appellation: 'AOP Morey Saint Denis',
			description: []
		}
	},
	'AOP Morey Saint Denis'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-chambolle-musigny',
		data: {
			appellation: 'AOP Chambolle Musigny',
			description: []
		}
	},
	'AOP Chambolle Musigny'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-musigny',
		data: {
			appellation: 'AOP Musigny',
			description: []
		}
	},
	'AOP Musigny'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-vougeot',
		data: {
			appellation: 'AOP Vougeot',
			description: []
		}
	},
	'AOP Vougeot'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-clos-de-vougeot',
		data: {
			appellation: 'AOP Clos de Vougeot',
			description: []
		}
	},
	'AOP Clos de Vougeot'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-vosne-romanee',
		data: {
			appellation: 'AOP Vosne Romanée',
			description: []
		}
	},
	'AOP Vosne Romanée'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-nuits-saint-georges',
		data: {
			appellation: 'AOP Nuits Saint Georges',
			description: []
		}
	},
	'AOP Nuits Saint Georges'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-hautes-cotes-de-nuits',
		data: {
			appellation: 'AOP Hautes Côtes de Nuits',
			description: []
		}
	},
	'AOP Hautes Côtes de Nuits'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-aloxe-corton',
		data: {
			appellation: 'AOP Aloxe Corton',
			description: []
		}
	},
	'AOP Aloxe Corton'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-corton-grand-cru',
		data: {
			appellation: 'AOP Corton Grand Cru',
			description: []
		}
	},
	'AOP Corton Grand Cru'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-beaune',
		data: {
			appellation: 'AOP Beaune',
			description: []
		}
	},
	'AOP Beaune'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-savigny-les-beaune',
		data: {
			appellation: 'AOP Savigny Lès Beaune',
			description: []
		}
	},
	'AOP Savigny Lès Beaune'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-chorey-les-beaune',
		data: {
			appellation: 'AOP Chorey Lès Beaune',
			description: []
		}
	},
	'AOP Chorey Lès Beaune'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-pommard',
		data: {
			appellation: 'AOP Pommard',
			description: []
		}
	},
	'AOP Pommard'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-monthelie',
		data: {
			appellation: 'AOP Monthelie',
			description: []
		}
	},
	'AOP Monthelie'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-hautes-cotes-de-beaune',
		data: {
			appellation: 'AOP Hautes Côtes de Beaune',
			description: []
		}
	},
	'AOP Hautes Côtes de Beaune'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-volnay',
		data: {
			appellation: 'AOP Volnay',
			description: []
		}
	},
	'AOP Volnay'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-meursault',
		data: {
			appellation: 'AOP Meursault',
			description: []
		}
	},
	'AOP Meursault'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-auxey-duresses',
		data: {
			appellation: 'AOP Auxey Duresses',
			description: []
		}
	},
	'AOP Auxey Duresses'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-saint-aubin',
		data: {
			appellation: 'AOP Saint Aubin',
			description: []
		}
	},
	'AOP Saint Aubin'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-puligny-montrachet',
		data: {
			appellation: 'AOP Puligny Montrachet',
			description: []
		}
	},
	'AOP Puligny Montrachet'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-chassagne-montrachet',
		data: {
			appellation: 'AOP Chassagne Montrachet',
			description: []
		}
	},
	'AOP Chassagne Montrachet'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-maranges',
		data: {
			appellation: 'AOP Maranges',
			description: []
		}
	},
	'AOP Maranges'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-santenay',
		data: {
			appellation: 'AOP Santenay',
			description: []
		}
	},
	'AOP Santenay'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-rully',
		data: {
			appellation: 'AOP Rully',
			description: []
		}
	},
	'AOP Rully'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-mercurey',
		data: {
			appellation: 'AOP Mercurey',
			description: []
		}
	},
	'AOP Mercurey'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-macon',
		data: {
			appellation: 'AOP Mâcon',
			description: []
		}
	},
	'AOP Mâcon'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-saint-veran',
		data: {
			appellation: 'AOP Saint Véran',
			description: []
		}
	},
	'AOP Saint Véran'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-pouilly-fuisse',
		data: {
			appellation: 'AOP Pouilly Fuissé',
			description: []
		}
	},
	'AOP Pouilly Fuissé'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-beaujolais',
		data: {
			appellation: 'AOP Beaujolais',
			description: []
		}
	},
	'AOP Beaujolais'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-beaujolais-villages',
		data: {
			appellation: 'AOP Beaujolais Villages',
			description: []
		}
	},
	'AOP Beaujolais Villages'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-chenas',
		data: {
			appellation: 'AOP Chénas',
			description: []
		}
	},
	'AOP Chénas'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-moulin-a-vent',
		data: {
			appellation: 'AOP Moulin à Vent',
			description: []
		}
	},
	'AOP Moulin à Vent'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-fleurie',
		data: {
			appellation: 'AOP Fleurie',
			description: []
		}
	},
	'AOP Fleurie'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-chiroubles',
		data: {
			appellation: 'AOP Chiroubles',
			description: []
		}
	},
	'AOP Chiroubles'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-morgon',
		data: {
			appellation: 'AOP Morgon',
			description: []
		}
	},
	'AOP Morgon'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-regnie',
		data: {
			appellation: 'AOP Régnié',
			description: []
		}
	},
	'AOP Régnié'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-cote-de-brouilly',
		data: {
			appellation: 'AOP Côte de Brouilly',
			description: []
		}
	},
	'AOP Côte de Brouilly'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-brouilly',
		data: {
			appellation: 'AOP Brouilly',
			description: []
		}
	},
	'AOP Brouilly'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'igp-val-de-loire',
		data: {
			appellation: 'IGP Val de Loire',
			description: []
		}
	},
	'IGP Val de Loire'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-cotes-roannaises',
		data: {
			appellation: 'AOP Côtes Roannaises',
			description: []
		}
	},
	'AOP Côtes Roannaises'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-saint-pourcain',
		data: {
			appellation: 'AOP Saint Pourçain',
			description: []
		}
	},
	'AOP Saint Pourçain'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-pouilly-fume',
		data: {
			appellation: 'AOP Pouilly Fumé',
			description: []
		}
	},
	'AOP Pouilly Fumé'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-sancerre',
		data: {
			appellation: 'AOP Sancerre',
			description: []
		}
	},
	'AOP Sancerre'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-menetou-salon',
		data: {
			appellation: 'AOP Menetou Salon',
			description: []
		}
	},
	'AOP Menetou Salon'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-cheverny',
		data: {
			appellation: 'AOP Cheverny',
			description: []
		}
	},
	'AOP Cheverny'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-touraine',
		data: {
			appellation: 'AOP Touraine',
			description: []
		}
	},
	'AOP Touraine'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-montlouis-sur-loire',
		data: {
			appellation: 'AOP Montlouis sur Loire',
			description: []
		}
	},
	'AOP Montlouis sur Loire'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-vouvray',
		data: {
			appellation: 'AOP Vouvray',
			description: []
		}
	},
	'AOP Vouvray'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-chinon',
		data: {
			appellation: 'AOP Chinon',
			description: []
		}
	},
	'AOP Chinon'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-bourgueil',
		data: {
			appellation: 'AOP Bourgueil',
			description: []
		}
	},
	'AOP Bourgueil'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-saint-nicolas-de-bourgueil',
		data: {
			appellation: 'AOP Saint Nicolas de Bourgueil',
			description: []
		}
	},
	'AOP Saint Nicolas de Bourgueil'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-saumur-champigny',
		data: {
			appellation: 'AOP Saumur Champigny',
			description: []
		}
	},
	'AOP Saumur Champigny'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-saumur',
		data: {
			appellation: 'AOP Saumur',
			description: []
		}
	},
	'AOP Saumur'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-anjou',
		data: {
			appellation: 'AOP Anjou',
			description: []
		}
	},
	'AOP Anjou'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-coteaux-du-layon',
		data: {
			appellation: 'AOP Coteaux du Layon',
			description: []
		}
	},
	'AOP Coteaux du Layon'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-savennieres',
		data: {
			appellation: 'AOP Savennières',
			description: []
		}
	},
	'AOP Savennières'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-muscadet',
		data: {
			appellation: 'AOP Muscadet',
			description: []
		}
	},
	'AOP Muscadet'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-gros-plant-nantais',
		data: {
			appellation: 'AOP Gros Plant Nantais',
			description: []
		}
	},
	'AOP Gros Plant Nantais'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-alsace',
		data: {
			appellation: 'AOP Alsace',
			description: []
		}
	},
	'AOP Alsace'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-cotes-du-jura',
		data: {
			appellation: 'AOP Côtes du Jura',
			description: []
		}
	},
	'AOP Côtes du Jura'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-arbois',
		data: {
			appellation: 'AOP Arbois',
			description: []
		}
	},
	'AOP Arbois'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-vin-de-savoie',
		data: {
			appellation: 'AOP Vin de Savoie',
			description: []
		}
	},
	'AOP Vin de Savoie'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'igp-cotes-de-gascogne',
		data: {
			appellation: 'IGP Côtes de Gascogne',
			description: []
		}
	},
	'IGP Côtes de Gascogne'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-gaillac',
		data: {
			appellation: 'AOP Gaillac',
			description: []
		}
	},
	'AOP Gaillac'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-cahors',
		data: {
			appellation: 'AOP Cahors',
			description: []
		}
	},
	'AOP Cahors'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-bergerac',
		data: {
			appellation: 'AOP Bergerac',
			description: []
		}
	},
	'AOP Bergerac'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-cotes-du-duras',
		data: {
			appellation: 'AOP Côtes du Duras',
			description: []
		}
	},
	'AOP Côtes du Duras'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-madiran',
		data: {
			appellation: 'AOP Madiran',
			description: []
		}
	},
	'AOP Madiran'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-jurancon',
		data: {
			appellation: 'AOP Jurançon',
			description: []
		}
	},
	'AOP Jurançon'
);

migration.createDocument(
	{
		type: 'appellation',
		lang: 'fr-fr',
		uid: 'aop-irouleguy',
		data: {
			appellation: 'AOP Irouleguy',
			description: []
		}
	},
	'AOP Irouleguy'
);

await writeClient.migrate(migration, {
	reporter: (event) => console.log(event)
});
