const { CF_PAGES_BRANCH } = process.env;

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  // Enable the Preact renderer to support Preact JSX components.
  renderers: ["@astrojs/renderer-preact"],
  devOptions: {
    tailwindConfig: "./tailwind.config.js",
    trailingSlash: "ignore",
  },
  buildOptions: {
    site:
      CF_PAGES_BRANCH === "master"
        ? "https://stachl.pages.dev"
        : CF_PAGES_BRANCH !== undefined
        ? `https://${CF_PAGES_BRANCH}.stachl.pages.dev`
        : "http://localhost:3000",
  },
});
