#!/bin/bash -eux

projects=("google-analytics")

for project in "${projects[@]}"
do
  yarn --cwd dist/$project publish --access public --tag next --new-version 0.0.0-$1 --no-git-tag-version
done

echo "Done"
