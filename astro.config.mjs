// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing '@ts-check' and `@type` comments below.

const { CF_PAGES_BRANCH } = process.env;

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  // Enable the Preact renderer to support Preact JSX components.
  renderers: ["@astrojs/renderer-preact"],
  markdownOptions: {
    remarkPlugins: [
      ["remark-directive"],
      [import("./plugins/remark/post-images.mjs")],
      ["remark-unwrap-images"],
    ],
    rehypePlugins: [
      // Add a Rehype plugin that you want to enable for your project.
      // If you need to provide options for the plugin, you can use an array and put the options as the second item.
      // 'rehype-slug',
      // ['rehype-autolink-headings', { behavior: 'prepend'}],
      [
        import("./plugins/rehype-video-embed/index.js"),
        {
          containerClass: "aspect-w-16 aspect-h-9",
          iframeClass: "rounded-md object-cover h-full w-full",
          allow:
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowfullscreen: true,
        },
      ],
    ],
  },
  devOptions: {
    tailwindConfig: "./tailwind.config.js",
    trailingSlash: "ignore",
  },
  buildOptions: {
    site: CF_PAGES_BRANCH === "master" ? "https://stachl.pages.dev" : "",
  },
});
