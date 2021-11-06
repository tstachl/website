// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing '@ts-check' and `@type` comments below.

const { CF_PAGES_BRANCH } = process.env;
const site = CF_PAGES_BRANCH === "master" ? "https://stachl.pages.dev" : "";

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  // Enable the Preact renderer to support Preact JSX components.
  renderers: ["@astrojs/renderer-preact"],
  markdownOptions: {
    remarkPlugins: [
      ["remark-gfm"],
      ["remark-directive"],
      [import("./plugins/remark/youtube-link.mjs")],
      [import("./plugins/remark/post-images.mjs")],
      ["remark-unwrap-images"],
      [import("./plugins/remark/image-gumlet.mjs")],
    ],
    rehypePlugins: [
      // Add a Rehype plugin that you want to enable for your project.
      // If you need to provide options for the plugin, you can use an array and put the options as the second item.
      // 'rehype-slug',
      // ['rehype-autolink-headings', { behavior: 'prepend'}],
    ],
  },
  devOptions: {
    tailwindConfig: "./tailwind.config.js",
    trailingSlash: "ignore",
  },
  buildOptions: {
    site: site,
  },
});
