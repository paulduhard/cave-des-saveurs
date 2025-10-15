import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginSvelte from 'eslint-plugin-svelte';
import eslintConfigPrettier from 'eslint-config-prettier';
import svelteParser from 'svelte-eslint-parser';

export default [
	pluginJs.configs.recommended,
	...pluginSvelte.configs['flat/recommended'],
	eslintConfigPrettier,
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parser: svelteParser,
			globals: {
				...globals.browser
			}
		}
	},
	{
		ignores: ['.svelte-kit/', '.vercel/']
	}
];
