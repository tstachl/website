import { visit } from "unist-util-visit";

export default function images(options) {
  return (tree, file) => {
    visit(tree, (node) => {
      if (node.type === "image") {
        const data = node.data || (node.data = {});
        const url = new URL(node.url, "https://example.org");
        url.searchParams.set("w", 320);

        data.hName = "img";
        data.hProperties = {
          dataSrc: node.url,
        };
      }
    });
  };
}
