const { CF_PAGES_BRANCH } = process.env;
const site =
  CF_PAGES_BRANCH === "master"
    ? "https://stachl.pages.dev"
    : CF_PAGES_BRANCH !== undefined
    ? `https://${CF_PAGES_BRANCH}.stachl.pages.dev`
    : "http://localhost:3000";

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  // Enable the Preact renderer to support Preact JSX components.
  renderers: ["@astrojs/renderer-preact"],
  // markdownOptions: {
  //   remarkPlugins: [
  //     // ["remark-gfm"],
  //     // ["remark-directive"],
  //     // [import("./plugins/remark/youtube-link.mjs")],
  //     // // [import("./plugins/remark/post-images.mjs")],
  //     // ["remark-unwrap-images"],
  //     // [import("./plugins/remark/image-gumlet.mjs"), { site: site }],
  //     // // [import("./plugins/remark/post-videos.mjs")],
  //   ],
  //   rehypePlugins: [
  //     // Add a Rehype plugin that you want to enable for your project.
  //     // If you need to provide options for the plugin, you can use an array and put the options as the second item.
  //     // 'rehype-slug',
  //     // ['rehype-autolink-headings', { behavior: 'prepend'}],
  //     // [import("./plugins/rehype/astro.mjs"), { site: site }],
  //   ],
  // },
  devOptions: {
    tailwindConfig: "./tailwind.config.js",
    trailingSlash: "ignore",
  },
  buildOptions: {
    site: site,
  },
});
