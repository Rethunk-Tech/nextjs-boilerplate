# syntax=docker/dockerfile:1
ARG NODE_VERSION="lts-alpine"
ARG HTTPD_VERSION="2.4"
ARG BUILD_TYPE="dev"

###########################################################
## nextjs-deps
###########################################################

FROM node:${NODE_VERSION} AS nextjs-deps
ENV HOME "/app"
WORKDIR $HOME

# copy files needed for the install...
COPY .yarn/releases/ $HOME/.yarn/releases/
COPY [ ".yarnrc*", ".pinyarn.js", ".eslintrc.json", "package.json", "tsconfig.json", "yarn.lock", "$HOME/" ]
RUN printf "\nenableGlobalCache: true\nglobalFolder: \"/cache/yarn\"\n" >> $HOME/.yarnrc.yml
RUN mkdir -p /cache/yarn
RUN --mount=type=cache,target=/cache/yarn YARN_CACHE_FOLDER=/cache/yarn yarn install --immutable

###########################################################
## nextjs-dev
###########################################################

FROM nextjs-deps AS nextjs-dev
ENV HOME "/app"
WORKDIR $HOME

# copy full repo now
COPY . $HOME

EXPOSE 9000
CMD yarn run dev

###########################################################
## nextjs-builder - intermediate production builder
###########################################################

FROM nextjs-dev AS nextjs-builder
ENV HOME "/app"
WORKDIR $HOME

# build a production server
RUN --mount=type=cache,target=/cache/yarn YARN_CACHE_FOLDER=/cache/yarn yarn run build

# build static HTML output files
RUN --mount=type=cache,target=/cache/yarn YARN_CACHE_FOLDER=/cache/yarn yarn run export

###########################################################
## nextjs-prod-dynamic - production (dynamic)
###########################################################

FROM node:${NODE_VERSION} AS nextjs-prod-dynamic
ENV HOME "/app"
ENV NODE_ENV production
WORKDIR $HOME

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=nextjs-builder "$HOME/public" "$HOME/public"
COPY --from=nextjs-builder "$HOME/package.json" "$HOME/package.json"
COPY --from=nextjs-builder "$HOME/yarn.lock" "$HOME/"
COPY --from=nextjs-builder --chown=nextjs:nodejs "$HOME/.next/standalone" "$HOME/"
COPY --from=nextjs-builder --chown=nextjs:nodejs "$HOME/.next/static" "$HOME/.next/static"

USER nextjs

EXPOSE 9000

ENV PORT 9000

CMD ["node", "server.js"]

###########################################################
## nextjs-prod-static - production (static)
###########################################################

FROM httpd:${HTTPD_VERSION}-alpine AS nextjs-prod-static
ENV HOME "/app"
WORKDIR $HOME

# prepare base image...
RUN rm -Rf /usr/local/apache2/htdocs/
RUN ln -s "$HOME" /usr/local/apache2/htdocs
RUN sed -ri 's~^(Listen) 80$~\1 9000~g' /usr/local/apache2/conf/httpd.conf

# copy files needed for content output...
COPY --from=nextjs-builder [ "$HOME/out", "$HOME/" ]

# ensure everything is good
RUN apachectl configtest

EXPOSE 9000

###########################################################
## nextjs - flexible build: dev or production
###########################################################

FROM nextjs-${BUILD_TYPE} AS nextjs
ENV HOME "/app"
WORKDIR $HOME

EXPOSE 9000
