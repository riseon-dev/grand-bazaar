FROM node:22.11-bookworm-slim AS builder

# Copy source
COPY . /app

# Create app directory
WORKDIR /app

# Setup PNPM
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Install
RUN npm install -g corepack@latest pnpm@latest
RUN corepack enable
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build
RUN pnpm build

# Deploy apps
RUN pnpm deploy --filter=api --prod /prod/api
RUN pnpm deploy --filter=web --prod /prod/web


FROM builder AS api
COPY --from=builder /prod/api /prod/api
WORKDIR /prod/api
EXPOSE 5000
CMD [ "pnpm", "start:prod" ]

FROM nginx:stable AS web
COPY --from=builder /prod/web /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]