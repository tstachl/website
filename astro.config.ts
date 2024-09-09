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
