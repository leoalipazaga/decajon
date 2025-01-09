export default {
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-svelte',
  ],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
