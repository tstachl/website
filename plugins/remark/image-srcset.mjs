import { visit } from "unist-util-visit";

export default function images(options) {
  return (tree, file) => {
    visit(tree, (node) => {
      if (node.type === "image") {
        const data = node.data || (node.data = {});
        const url = new URL(node.url, "https://example.org");
        // 1024, 640, 320
        const srcSet = [320, 640, 1024].map((w) => {
          url.searchParams.set("w", w);
          return options.site + url.pathname + url.search + " " + w + "w";
        });

        url.searchParams.set("w", 320);

        data.hName = "img";
        data.hProperties = {
          width: "100%",
          src: options.site + url.pathname + url.search,
          srcSet: srcSet.join(", "),
          sizes: "(min-width: 640px) 33.3vm, (min-width: 768px) 66.6vm, 100vw",
        };
      }
    });
  };
}
