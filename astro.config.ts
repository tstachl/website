// const { CF_PAGES_BRANCH, DOMAIN } = process.env;
// buildOptions: {
//   site:
//     CF_PAGES_BRANCH === "master"
//       ? DOMAIN !== undefined
//         ? DOMAIN
//         : "https://stachl.pages.dev"
//       : CF_PAGES_BRANCH !== undefined
//       ? `https://${CF_PAGES_BRANCH}.stachl.pages.dev`
//       : "http://localhost:3000",
//   pageUrlFormat: "file",
// },

import { defineConfig } from "astro/config"

import mdx from "@astrojs/mdx"
import remarkDirective from 'remark-directive'
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"

import { youtube } from "./src/plugins/youtube"
import { image } from "./src/plugins/image"

// https://astro.build/config
export default defineConfig({
  site: "https://stachl.me",
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    remarkPlugins: [image, remarkDirective, youtube],
  },
})
