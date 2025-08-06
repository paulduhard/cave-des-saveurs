import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.Bx_AMlsZ.js","_app/immutable/chunks/BQ2xAIDg.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/Cue3KCGO.js","_app/immutable/chunks/C2Lo5ctW.js","_app/immutable/chunks/D3Dz0665.js"];
export const stylesheets = ["_app/immutable/assets/0.-yBTqeqm.css"];
export const fonts = [];
