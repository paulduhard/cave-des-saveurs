import * as server from '../entries/pages/__preview_preview__/epicerie/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/__preview_preview__/epicerie/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/[[preview=preview]]/epicerie/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.ATVK1cr0.js","_app/immutable/chunks/BQ2xAIDg.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/B1HT97m5.js","_app/immutable/chunks/D3Dz0665.js","_app/immutable/chunks/C6_CeyLG.js"];
export const stylesheets = ["_app/immutable/assets/index.C2MkEkLV.css"];
export const fonts = [];
