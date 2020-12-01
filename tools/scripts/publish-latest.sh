#!/bin/bash -eux

project=$1

echo "Publishing ${project}"

yarn build ${project} --prod --with-deps
cd dist/projects/${project}
yarn can-npm-publish && yarn publish --access public

echo "Done"
