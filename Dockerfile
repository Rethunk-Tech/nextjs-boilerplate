# syntax=docker/dockerfile:1
ARG NODE_VERSION="lts"

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
## nextjs - production
###########################################################

FROM node:${NODE_VERSION}-alpine AS nextjs
ENV HOME "/app"
WORKDIR $HOME

# copy files needed for the install...
COPY . $HOME
RUN mkdir -p /cache/yarn
# copy the dependencies
COPY --from=nextjs-dev [ "$HOME/node_modules", "$HOME/node_modules/" ]
# ensure everything is good
RUN --mount=type=cache,target=/cache/yarn YARN_CACHE_FOLDER=/cache/yarn yarn install --frozen-lockfile

EXPOSE 9000
CMD yarn dlx next start
