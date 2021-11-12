---
layout: ../../layouts/Post.astro
title: The first Video Podcast Episode
date: 2021-11-06T09:36:39-07:00
banner:
  - https://video.gumlet.io/6185f2be3c9adf7654bdd3b7/618da5f43c9adf3390c2f55a/thumbnail-1-0.png
description: "In this episode of the Walk of Growth podcast, we'll explore how to show video podcasts on my personal website."
category: growth
setup: |
  import GumletVideo from '../../components/GumletVideo.astro';
---

In this episode of the Walk of Growth podcast, we'll explore how to show video podcasts on my personal website.

Oh, and additionally to that: Gumlet videos should be able to be streamed in a post as well:

<GumletVideo url="https://video.gumlet.io/6185f2be3c9adf7654bdd3b7/618da5f43c9adf3390c2f55a/1.m3u8" />

Let's see if that works decently. Why does this not reload?
