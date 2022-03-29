#!/bin/bash
CURRENT_DIR=$(pwd)
cd ../Dockerfile.d
REGISTRY_PATH=git3.nexdev.net:5050/l1/database/mongodb
REGISTRY_IMAGE=mongo
REGISTRY_TAG=$REGISTRY_PATH/$REGISTRY_IMAGE
REGISTRY_VERSION=4.2.19
echo "ZPffaRzjxMpGs2X8bQ_E" | docker login -u billy.bui --password-stdin git3.nexdev.net:5050
docker pull $REGISTRY_TAG:latest || true
docker build --pull \
             --file Dockerfile_$REGISTRY_IMAGE \
             --tag $REGISTRY_TAG:$REGISTRY_VERSION \
             --cache-from $REGISTRY_TAG:latest \
             .
docker push $REGISTRY_TAG:$REGISTRY_VERSION
docker tag $REGISTRY_TAG:$REGISTRY_VERSION $REGISTRY_TAG:latest
docker push $REGISTRY_TAG:latest
cd $CURRENT_DIR