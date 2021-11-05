import { visit } from "unist-util-visit";

export default function images(options) {
  return (tree, file) => {
    visit(tree, (node) => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        if (node.name !== "image") return;

        if (node.type === "textDirective")
          file.fail("Text directives for `image` not supported", node);
        if (node.type === "leafDirective")
          file.fail("Leave directives for `image` not supported", node);

        const data = node.data || (node.data = {});

        data.hName = "div";
        data.hProperties = node.attributes;
      }
    });
  };
}
