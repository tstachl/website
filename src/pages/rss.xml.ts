import rss from "@astrojs/rss"
import type { APIContext } from "astro"
import { type CollectionEntry, getCollection } from "astro:content"
import { site } from "@content/config"
import { sortPostsByDateDesc } from "@utils/data-utils"

export async function GET(context: APIContext) {
  const posts = (await getCollection("posts")).sort(sortPostsByDateDesc)
  return rss({
    title: site.title,
    description: site.description,
    site: context.site as URL,
    items: posts.map((item: CollectionEntry<"posts">) => ({
      title: item.data.title,
      description: item.data.description,
      link: `/posts/${item.slug}`,
      pubDate: item.data.date.setUTCHours(0),
    }))
  })
}
