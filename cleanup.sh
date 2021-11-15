#!/usr/bin/env bash
echo "s~<url><loc>${DOMAIN}/feed/index.html</loc></url>~~g"
sed -i -e "s~<url><loc>${DOMAIN}/feed/index.html</loc></url>~~g" ./dist/sitemap.xml
rm -rf ./dist/feed
