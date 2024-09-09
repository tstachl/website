{ pkgs, ... }:
{
  dotenv.enable = true;

  languages.javascript.enable = true;
  languages.javascript.bun.enable = true;

  packages = with pkgs; [ nodePackages.prettier nodePackages.wrangler ];

  scripts = {
    astro.exec = "bunx --bun astro \"$@\"";
    deploy.exec = "wrangler pages deploy --project-name=$CLOUDFLARE_PROJECT --branch=$CLOUDFLARE_BRANCH dist/";
  };
}
