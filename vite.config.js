import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		host: true,
		fs: {
			// Allow access to files from the project root.
			allow: ['..']
		}
	}
});
