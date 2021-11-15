import astroRemark from "@astrojs/markdown-remark";

const { CF_PAGES_BRANCH, DOMAIN } = process.env;

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  // Enable the Preact renderer to support Preact JSX components.
  renderers: ["@astrojs/renderer-preact"],
  markdownOptions: {
    render: [
      astroRemark,
      {
        remarkPlugins: [], // ["remark-code-titles", "remark-slug"],
        rehypePlugins: [
          // ["rehype-autolink-headings", { behavior: "prepend" }],
          // ["rehype-toc", { headings: ["h2", "h3"] }],
          // ["rehype-add-classes", { "h1,h2,h3": "title" }],
          ["../../../../plugins/youtube-thumbnail.mjs"],
        ],
      },
    ],
  },
  devOptions: {
    tailwindConfig: "./tailwind.config.js",
    trailingSlash: "ignore",
  },
  buildOptions: {
    site:
      CF_PAGES_BRANCH === "master"
        ? DOMAIN !== undefined
          ? DOMAIN
          : "https://stachl.pages.dev"
        : CF_PAGES_BRANCH !== undefined
        ? `https://${CF_PAGES_BRANCH}.stachl.pages.dev`
        : "http://localhost:3000",
    pageUrlFormat: "file",
  },
});
