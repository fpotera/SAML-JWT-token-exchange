FROM node:18 AS node-test

WORKDIR /app

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

COPY app/ app
COPY bin/ bin
COPY config/ config
COPY lib/ lib

COPY package.json package-lock.json ./

RUN npm install

CMD ["node", "bin/server.js", "-p", "8081","--idpMetaUrl", "https://pingfederate:9031/pf/federation_metadata.ping?PartnerSpId=urn%3Aexample%3Asp"]
