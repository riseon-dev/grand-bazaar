FROM node:22.11-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack@latest pnpm@latest
RUN corepack enable


FROM base AS build
COPY . /app
WORKDIR /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm run -r build

RUN pnpm deploy --filter=api --prod /prod/api && \
     cp -r "$(pnpm --filter=api list --depth=-1 --parseable)/dist" /prod/api/dist
RUN pnpm deploy --filter=web --prod /prod/web && \
     cp -r "$(pnpm --filter=web list --depth=-1 --parseable)/dist" /prod/web

FROM base AS api
COPY --from=build /prod/api /prod/api
WORKDIR /prod/api
RUN ls -la
EXPOSE 5000
CMD [ "pnpm", "start:prod" ]

FROM base AS web
COPY --from=build /prod/web /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
