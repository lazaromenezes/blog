#!/bin/bash

docker container run --user $(id -u):$(id -g) -it -p 1313:1313 --rm -v .:/src hugomods/hugo server -D
