import { visit } from "unist-util-visit";
import { access, writeFile } from "fs/promises";
import fetch from "node-fetch";
import getVideoId from "get-video-id";

export default function youtubeLink(options) {
  return async (tree, file) => {
    let nodes = [];

    visit(tree, "link", (node) => {
      const video = getVideoId(node.url);

      if (video && video.id && video.service === "youtube") {
        node.children = [
          {
            type: "image",
            url: `/images/videos/${video.service}/${video.id}.jpg`,
            title: node.title,
            alt: node.title,
          },
        ];

        node.data = {
          hProperties: {
            target: "__blank",
            rel: "noopener",
            class: ["youtube-link"],
          },
        };

        nodes.push(node);
      }
    });

    await Promise.all(
      nodes.map(async (node) => {
        const video = getVideoId(node.url);
        const image = `public/images/videos/${video.service}/${video.id}.jpg`;

        try {
          await access(image);
        } catch {
          const response = await fetch(
            `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`
          );

          if (!response.ok)
            throw new Error(`unexpected response ${response.statusText}`);

          await writeFile(image, await response.buffer());
        }
      })
    );

    return tree;
  };
}
