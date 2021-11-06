import { visit } from "unist-util-visit";

export default function images(options) {
  return (tree, file) => {
    visit(tree, (node) => {
      if (node.type === "image") {
        const data = node.data || (node.data = {});

        data.hName = "img";
        data.hProperties = {
          dataSrc: options.site + node.url,
        };
      }
    });
  };
}
