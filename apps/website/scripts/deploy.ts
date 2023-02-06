import { $ } from "zx";

const image = "ghcr.io/amirilovic/effective-monorepos-website:latest";

async function deploy() {
  await $`pnpm -F @shop/website deploy --prod out`;

  await $`echo "$DOCKER_PASSWORD" | docker login -u $DOCKER_USERNAME --password-stdin ghcr.io`;

  await $`docker build -f ./out/Dockerfile \
        -t ${image} \
        --cache-from=${image} ./out`;

  await $`docker push ${image}`;
}

deploy();
