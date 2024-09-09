import type { Root } from "mdast"
import type { Properties } from "hast"
import { visit } from "unist-util-visit"
import { remove } from "unist-util-remove"
import { parse } from "qs"

function validateSiblingIsAttributes(str: string) {
  if (str.charAt(0) === "{" && str.charAt(str.length - 1) === "}") {
    return true
  }
  return false
}

function extractAttributeString(str: string) {
  const matches = str.match(/^\{(.*?)\}$/)
  if (matches) {
    return matches[1]
  }
  return null
}

function parseAttributes(str: string): Properties {
  let attrs = {} as Properties
  const query = extractAttributeString(str)?.replaceAll("#", " id=").replaceAll(".", " class=").replace(/\s+/g, "&")
  
  if (query) {
    attrs = parse(query) as Properties
    if (attrs.id && Array.isArray(attrs.id)) {
      attrs.id = attrs.id[attrs.id.length - 1]
    }
    if (attrs.class && Array.isArray(attrs.class)) {
      attrs.class = attrs.class.join(" ")
    }
  }

  return attrs
}

export function image() {
  return (tree: Root) => {
    visit(tree, "image", (node, index, parent) => {
      const nextSibling = parent!.children[index!+1]
      if (nextSibling?.type === "text" && validateSiblingIsAttributes(nextSibling?.value)) {
        if (!node.data) node.data = {}
        node.data.hProperties = parseAttributes(nextSibling?.value)
        remove(tree, nextSibling)
      }
    })
  }
}
