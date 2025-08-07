export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","assets/.DS_Store","assets/chevron-droit.svg","assets/chevron-gauche.svg","assets/icone-external-link-black.svg","assets/icone-external-link-primary.svg","assets/icone-external-link.svg","assets/placeholder.png","favicon.svg"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.Bg0OiN43.js",app:"_app/immutable/entry/app.GF6oUotd.js",imports:["_app/immutable/entry/start.Bg0OiN43.js","_app/immutable/chunks/eLiSNUS2.js","_app/immutable/chunks/BQ2xAIDg.js","_app/immutable/entry/app.GF6oUotd.js","_app/immutable/chunks/BQ2xAIDg.js","_app/immutable/chunks/IHki7fMi.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js')),
			__memo(() => import('../output/server/nodes/3.js')),
			__memo(() => import('../output/server/nodes/4.js')),
			__memo(() => import('../output/server/nodes/5.js')),
			__memo(() => import('../output/server/nodes/6.js')),
			__memo(() => import('../output/server/nodes/7.js'))
		],
		routes: [
			{
				id: "/api/preview",
				pattern: /^\/api\/preview\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/preview/_server.js'))
			},
			{
				id: "/[[preview=preview]]/cave/[uid]",
				pattern: /^(?:\/([^/]+))?\/cave\/([^/]+?)\/?$/,
				params: [{"name":"preview","matcher":"preview","optional":true,"rest":false,"chained":true},{"name":"uid","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/[[preview=preview]]/epicerie",
				pattern: /^(?:\/([^/]+))?\/epicerie\/?$/,
				params: [{"name":"preview","matcher":"preview","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/[[preview=preview]]/vin/[uid]",
				pattern: /^(?:\/([^/]+))?\/vin\/([^/]+?)\/?$/,
				params: [{"name":"preview","matcher":"preview","optional":true,"rest":false,"chained":true},{"name":"uid","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/[[preview=preview]]",
				pattern: /^(?:\/([^/]+))?\/?$/,
				params: [{"name":"preview","matcher":"preview","optional":true,"rest":false,"chained":true}],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/[[preview=preview]]/[uid]",
				pattern: /^(?:\/([^/]+))?\/([^/]+?)\/?$/,
				params: [{"name":"preview","matcher":"preview","optional":true,"rest":false,"chained":true},{"name":"uid","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		prerendered_routes: new Set(["/epicerie","/epicerie/__data.json","/slice-simulator","/slice-simulator/__data.json","/","/__data.json","/vin/resistant-blanc","/vin/resistant-blanc/__data.json","/vin/resistant-orange","/vin/resistant-orange/__data.json","/vin/paola-bulles","/vin/paola-bulles/__data.json","/vin/resistant-rouge","/vin/resistant-rouge/__data.json","/vin/haru-rouge","/vin/haru-rouge/__data.json","/vin/depuis-1927-rose","/vin/depuis-1927-rose/__data.json","/vin/fake-wine","/vin/fake-wine/__data.json","/vin/depuis-1927-blanc","/vin/depuis-1927-blanc/__data.json","/vin/depuis-1927-rouge","/vin/depuis-1927-rouge/__data.json","/home","/home/__data.json","/boutique","/boutique/__data.json"]),
		matchers: async () => {
			const { match: preview } = await import ('../output/server/entries/matchers/preview.js')
			return { preview };
		},
		server_assets: {}
	}
}
})();
