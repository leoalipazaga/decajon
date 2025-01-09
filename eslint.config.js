import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginAstro from 'eslint-plugin-astro'
import eslintPluginPrettier from 'eslint-config-prettier'
import eslintPluginSvelte from 'eslint-plugin-svelte'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
  eslintPluginPrettier,
  {
    ignores: ['**/dist/', 'src/env.d.ts'],
  },
  {
    rules: {
      'no-console': 'error',
      'newline-before-return': 'error',
    },
  },
]
