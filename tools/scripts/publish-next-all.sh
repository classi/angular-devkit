#!/bin/bash -eux

projects=("google-analytics", "ngrx-extensions")
previewVersion=0.0.0-$1

echo $previewVersion

for project in "${projects[@]}"
do
  yarn --cwd dist/projects/${project} publish --access public --tag next --new-version ${previewVersion} --no-git-tag-version
done

echo "Done"
