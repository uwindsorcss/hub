#!/usr/bin/sh

# make directory if it doesnt exist
mkdir -p .dockerdev

# make symbolink for gemfile and dockerfile
cp -f Gemfile .dockerdev/Gemfile
cp -f Gemfile.lock .dockerdev/Gemfile.lock
cp -f Dockerfile .dockerdev/Dockerfile

docker-compose build
