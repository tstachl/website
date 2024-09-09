import { type CollectionEntry } from "astro:content"

type NameAndSlug = {
  name: string
  slug: string
}

function filterBySlug(obj: NameAndSlug, pos: number, arr: NameAndSlug[]) {
  return arr.map((mapObj) => mapObj.slug).indexOf(obj.slug) === pos
}

function nameAndSlug(str: string) {
  return { name: str, slug: slugify(str) }
}

export function slugify(input?: string) {
  if (!input) return ""
  console.log(input)

  return input
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .trim()
    .replace(/[\s-]+/g, "-")
}

export function sortPostsByDateDesc(
  itemA: CollectionEntry<"posts">,
  itemB: CollectionEntry<"posts">
) {
  return (
    new Date(itemB.data.date).getTime() - new Date(itemA.data.date).getTime()
  )
}

export function sortCategoryByNameAsc(
  itemA: CollectionEntry<"categories">,
  itemB: CollectionEntry<"categories">
) {
  return itemA.data.name.localeCompare(itemB.data.name)
}

export function getAllCategories(posts: CollectionEntry<"posts">[]) {
  const categories: string[] = [
    ...new Set(
      posts.flatMap((post) => post.data.category.id || null).filter(Boolean)
    ),
  ]
  return categories.map(nameAndSlug).filter(filterBySlug)
}

export function getPostsByCategory(
  posts: CollectionEntry<"posts">[],
  categorySlug: string
) {
  const filteredPosts: CollectionEntry<"posts">[] = posts.filter(
    (post) => slugify(post.data.category.id) === categorySlug
  )
  return filteredPosts
}

export function formatCanonicalURL(url: string | URL) {
  const path = url.toString()
  const hasQueryParams = path.includes("?")
  if (hasQueryParams) {
    path.replace(/\/?$/, "")
  }
  return path.replace(/\/?$/, hasQueryParams ? "" : "/")
}
