import { defineCollection, reference, z } from "astro:content"
import logo from "@assets/thomas.png"

type SiteConfig = {
  logo?: ImageMetadata
  title: string
  tagline: string
  description: string
  postsPerPage?: number
}

const pages = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    banner: z.object({
      src: image(),
      alt: z.string().optional(),
    }),
    description: z.string().optional(),
  }),
})

const posts = defineCollection({
  type: "content",
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    banner: z.object({
      src: image(),
      alt: z.string().optional(),
    }),
    description: z.string().optional(),
    category: reference("categories"),
  }),
})

const categories = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    description: z.string(),
  }),
})

export const site: SiteConfig = {
  logo,
  title: "Thomas Stachl",
  tagline: "Love The Life You Are Living!",
  description:
    "A personal blog and creative outlet after leaving social media.",
  postsPerPage: 8,
}

export const collections = { categories, pages, posts }
