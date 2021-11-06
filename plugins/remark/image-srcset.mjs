import { visit } from "unist-util-visit";

export default function images(options) {
  return (tree, file) => {
    visit(tree, (node) => {
      if (node.type === "image") {
        const data = node.data || (node.data = {});
        const url = new URL(node.url, "https://example.org");

        const srcSet = [1024, 640, 320].map((w) => {
          url.searchParams.set("w", w);
          return options.site + url.pathname + url.search + " " + w + "w";
        });

        url.searchParams.set("w", 320);

        data.hName = "img";
        data.hProperties = {
          src: options.site + url.pathname + url.search,
          srcSet: srcSet.join(", "),
        };
      }
    });
  };
}
