# syntax=docker/dockerfile:1
ARG NODE_VERSION="lts"
ARG HTTPD_VERSION="2.4"
ARG BUILD_TYPE="dev"

###########################################################
## nextjs-dev
###########################################################

FROM node:${NODE_VERSION} AS nextjs-dev
ENV HOME "/app"
WORKDIR $HOME

# copy files needed for the install...
COPY .yarn/releases/ $HOME/.yarn/releases/
COPY [ ".yarnrc*", ".pinyarn.js", ".eslintrc.json", "package.json", "tsconfig.json", "yarn.lock", "$HOME/" ]
RUN printf "\nenableGlobalCache: true\nglobalFolder: \"/cache/yarn\"\n" >> $HOME/.yarnrc.yml
RUN mkdir -p /cache/yarn
RUN --mount=type=cache,target=/cache/yarn YARN_CACHE_FOLDER=/cache/yarn yarn install --immutable
# copy full repo now
COPY . $HOME
RUN printf "\nenableGlobalCache: true\nglobalFolder: \"/cache/yarn\"\n" >> $HOME/.yarnrc.yml

EXPOSE 9000
CMD yarn run dev

###########################################################
## nextjs-builder - intermediate production builder
###########################################################

FROM nextjs-dev AS nextjs-builder
ENV HOME "/app"
WORKDIR $HOME

# install the production dependencies
RUN --mount=type=cache,target=/cache/yarn YARN_CACHE_FOLDER=/cache/yarn yarn install --immutable
# build the final output files
RUN --mount=type=cache,target=/cache/yarn YARN_CACHE_FOLDER=/cache/yarn yarn run build
RUN --mount=type=cache,target=/cache/yarn YARN_CACHE_FOLDER=/cache/yarn yarn run export

CMD exit

###########################################################
## nextjs-prod - production
###########################################################

FROM httpd:${HTTPD_VERSION}-alpine AS nextjs-prod
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
