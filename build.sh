#!/bin/sh

rm -rf webapp/saml-sp-demo

git clone https://github.com/fpotera/saml-sp-demo.git webapp/saml-sp-demo

docker compose up -d
