REGISTRY=git3.nexdev.net:5000/l1/database
for FILE in $(ls Dockerfile_*)
do
  SERVICE=$(echo $FILE | sed 's/^Dockerfile_\(.*\)$/\1/')
  VERSION=$(cat version_$SERVICE)
  echo $SERVICE:$VERSION

  docker pull $REGISTRY/$SERVICE:latest || true
  docker build \
    --tag $REGISTRY/$SERVICE:$VERSION \
    --file $FILE \
    --cache-from $REGISTRY/$SERVICE:latest \
    .
  docker push $REGISTRY/$SERVICE:$VERSION
  docker tag $REGISTRY/$SERVICE:$VERSION $REGISTRY/$SERVICE:latest
  docker push $REGISTRY/$SERVICE:latest
done