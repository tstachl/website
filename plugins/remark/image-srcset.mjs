// if (!skipSrcSet) {
//   src = `srcset="${src}?nf_resize=fit&w=500 500w, ${src}?nf_resize=fit&w=800 800w"
//     sizes="100vw"
//     src="${src}?nf_resize=fit&w=1000"
//   `
// }

/* <img class="rounded-md object-cover h-full w-full" src="/images/desk-with-do-more-on-computer-carl-heyerdahl-unsplash.jpg?w=320" srcset="/images/desk-with-do-more-on-computer-carl-heyerdahl-unsplash.jpg?w=1024 1024w, /images/desk-with-do-more-on-computer-carl-heyerdahl-unsplash.jpg?w=640 640w, /images/desk-with-do-more-on-computer-carl-heyerdahl-unsplash.jpg?w=320 320w" sizes="100vw" alt="">
</img> */

import { visit } from "unist-util-visit";
import { h } from "hastscript";

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
