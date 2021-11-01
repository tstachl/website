import { visit } from "unist-util-visit"
import { is } from "unist-util-is"
import getVideoId from "get-video-id"

function getSrc(video) {
  return video.service === 'youtube' ? `//www.youtube.com/embed/${video.id}` :
         video.service === 'vimeo' ? `//player.vimeo.com/video/${video.id}` :
         video.service === 'vine' ? `//vine.co/v/${video.id}/embed/simple` :
         video.service === 'videopress' ? `//videopress.com/embed/${video.id}` :
         video.service === 'microsoftstream' ? `//web.microsoftstream.com/embed/video/${video.id}` :
         video.service === 'dailymotion' ? `https://www.dailymotion.com/embed/video/${video.id}` : '';
}

export default function videoEmbed(options) {
  return (tree, file) => {
    visit(tree, 'element', (node, _, parent) => {
      if (
        node.tagName === 'a' // do we have a link?
        && parent.tagName === 'p' // in a paragraph
        && parent.children.length === 1 // where this is the only child
        && node.properties.href === node.children[0].value // embed?
      ) {
        // do we have a video?
        const video = getVideoId(node.properties.href);

        if (video && video.id) {
          Object.assign(parent, {
            type: 'element',
            tagName: 'div',
            properties: {
              'class': options.containerClass || '',
            },
            children: [
              {
                type: 'element',
                tagName: 'iframe',
                properties: {
                  'src': getSrc(video),
                  'class': options.iframeClass || "",
                  'frameborder': options.frameborder || 0,
                  'allow': options.allow || "",
                  'allowfullscreen': options.allowfullscreen || false
                },
                children: [],
                position: node.position,
              }
            ],
            position: parent.position,
          });
        }
      }
    })
  }
}
