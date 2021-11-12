const { NODE_ENV, CF_PAGES_BRANCH } = process.env;

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
      NODE_ENV === "production"
        ? "https://stachl.pages.dev"
        : NODE_ENV === "preview"
        ? `https://${CF_PAGES_BRANCH}.stachl.pages.dev`
        : "http://localhost:3000",
  },
});
