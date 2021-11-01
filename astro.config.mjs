// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  // Enable the Preact renderer to support Preact JSX components.
  renderers: ['@astrojs/renderer-preact'],
  markdownOptions: {
    remarkPlugins: [
      // Add a Remark plugin that you want to enable for your project.
      // If you need to provide options for the plugin, you can use an array and put the options as the second item.
      // ['remark-autolink-headings', { behavior: 'prepend'}],
    ],
    rehypePlugins: [
      // Add a Rehype plugin that you want to enable for your project.
      // If you need to provide options for the plugin, you can use an array and put the options as the second item.
      // 'rehype-slug',
      // ['rehype-autolink-headings', { behavior: 'prepend'}],
      [import('./packages/rehype-video-embed/index.js'), {
        className: "rounded-md object-cover h-full w-full"
      }],
    ],
  },
  devOptions: {
    tailwindConfig: './tailwind.config.js',
    trailingSlash: 'ignore',
  },
  buildOptions: {
    site: 'https://stachl.me'
  }
});
