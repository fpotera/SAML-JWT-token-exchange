FROM node:18 AS node-test

WORKDIR /app

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

COPY saml-sp-demo/app/ app
COPY bin/ bin
COPY saml-sp-demo/config/ config
COPY saml-sp-demo/lib/ lib
COPY lib/ lib

COPY saml-sp-demo/package.json saml-sp-demo/package-lock.json ./

RUN npm install

CMD ["node", "bin/server.js", "-p", "8081","--idpMetaUrl", "https://pingfederate:9031/pf/federation_metadata.ping?PartnerSpId=urn%3Aexample%3Asp"]
