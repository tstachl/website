import { visit } from "unist-util-visit";
import { access, writeFile } from "fs/promises";
import fetch from "node-fetch";

function parser(url) {
  const regex =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regex);
  return match && match[7].length == 11 ? match[7] : false;
}

export default function youtubeThumbnail(options) {
  return async (tree) => {
    let videoIds = [];

    visit(tree, "raw", (node) => {
      const regex = /<YoutubeVideo[^>]*?url=(["\'])?((?:.(?!\1|>))*.?)\1?/i;
      if (node.value) {
        const matches = node.value.match(regex);
        if (matches) {
          videoIds.push(parser(matches.pop()));
        }
      }
    });

    await Promise.all(
      videoIds.map(async (videoId) => {
        const image = `public/images/videos/${videoId}.jpg`;

        try {
          await access(image);
        } catch {
          const response = await fetch(
            `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
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
