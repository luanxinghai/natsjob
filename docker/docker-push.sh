#!/bin/bash

extract_version() {
    local filename="$1"
    echo "$filename" | sed -E 's/.*-(v[0-9]+\.[0-9]+\.[0-9]+)-.*/\1/'
}


VERSION=$(extract_version "$(basename ../libs/natsjob-*-linux-amd64)")
VERSION=${VERSION#v}

#version
IMAGE_AMD="luanxinghai/natsjob:${VERSION}"
IMAGE_ARM="luanxinghai/natsjob:${VERSION}-arm"

docker push ${IMAGE_AMD}
docker push ${IMAGE_ARM}

manifest="luanxinghai/natsjob:${VERSION}"
docker manifest rm  ${manifest}
docker manifest create ${manifest} \
${IMAGE_AMD} \
${IMAGE_ARM}

docker manifest push ${manifest}

#latest
manifest_latest="luanxinghai/natsjob:latest"
IMAGE_AMD_LATEST="${IMAGE_AMD}-latest"
IMAGE_ARM_LATEST="${IMAGE_ARM}-latest"

docker manifest rm  ${manifest_latest}

docker tag ${IMAGE_AMD} ${IMAGE_AMD_LATEST}
docker tag ${IMAGE_ARM} ${IMAGE_ARM_LATEST}

docker push ${IMAGE_AMD_LATEST}
docker push ${IMAGE_ARM_LATEST}

docker manifest create ${manifest_latest} \
${IMAGE_AMD_LATEST} \
${IMAGE_ARM_LATEST}

docker manifest push ${manifest_latest}
