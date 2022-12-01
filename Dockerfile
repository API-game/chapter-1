# Define node image
ARG NODE=node:16-alpine

# https://stackoverflow.com/a/58487433
# To prevent cache invalidation from changes in fields other than dependencies
FROM endeveit/docker-jq AS deps
COPY package.json /tmp
RUN jq '{ dependencies, license, devDependencies, peerDependencies, optionalDependencies, bundledDependencies }' < /tmp/package.json > /tmp/package-json-deps.json

### Transpile TS > JS
FROM $NODE as ts-compiler
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN yarn

COPY src ./src
COPY views ./views
RUN yarn build

### Run app
FROM $NODE as ts-remover
WORKDIR /app
COPY --from=ts-compiler /app/dist ./dist
COPY --from=ts-compiler /app/views ./views

RUN chown node:node /app
USER node

COPY --from=deps /tmp/package-json-deps.json ./package.json
RUN yarn install --production --frozen-lockfile && yarn cache clean


FROM $NODE
WORKDIR /app
COPY --from=ts-remover /app ./

CMD node dist/index.js
