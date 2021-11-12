const { NODE_ENV } = process.env;

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  // Enable the Preact renderer to support Preact JSX components.
  renderers: ["@astrojs/renderer-preact"],
  devOptions: {
    tailwindConfig: "./tailwind.config.js",
    trailingSlash: "ignore",
  },
  buildOptions: {
    site: NODE_ENV === "production" ? "https://stachl.pages.dev" : "",
  },
});
