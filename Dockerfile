FROM node:16.19.0-slim


# default port 3000 for node, and 9229 and 9230 for test/debug
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230

# pin this version for the best stability
RUN npm i npm@latest -g

# install dependencies first, in a different location for easier app bind mounting for local development
RUN mkdir /usr/supremo_ddd_patterns && chown node:node /usr/supremo_ddd_patterns 

WORKDIR /usr/supremo_ddd_patterns

# the official node image provides an unprivileged user as a security best practice
# user who runs the app
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node
COPY --chown=node:node package.json package-lock.json* ./
RUN npm ci
RUN npm cache clean --force
ENV PATH /usr/supremo_ddd_patterns/node_modules/.bin:$PATH

# copy our source code last, because it changes the most
# copy in as node user, because that permissionas match what we need
#WORKDIR /usr/supremo_ddd_patterns/app
COPY --chown=node:node . .

ENTRYPOINT bash
