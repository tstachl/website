import type { Root } from "mdast"
import type { VFile } from "vfile"
import { visit } from "unist-util-visit"

export function youtube() {
  return (tree: Root, file: VFile) => {
    visit(tree, { name: "youtube" }, (node) => {
      const data = node.data || (node.data = {})
      const { id, class: className } = node.attributes || {}

      if (node.type === 'textDirective') {
        file.fail(
          'Unexpected `:youtube` text directive, use two colons for a leaf directive',
          node
        )
      }

      if (!id) {
        file.fail('Unexpected missing `id` on `youtube` directive', node)
      }

      data.hName = 'iframe'
      data.hProperties = {
        src: 'https://www.youtube-nocookie.com/embed/' + id,
        className,
        frameBorder: 0,
        allow: 'picture-in-picture',
        allowFullScreen: true,
      }
    })
  }
}
