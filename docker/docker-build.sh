#!/bin/bash

# 定义函数提取版本号
extract_version() {
    local filename="$1"
    echo "$filename" | sed -E 's/.*-(v[0-9]+\.[0-9]+\.[0-9]+)-.*/\1/'
}

# AMD64 构建
cd amd
rm -f natsjob
cp ../../libs/natsjob-*-linux-amd64 ./natsjob
chmod +x ./natsjob

# 提取版本号并构建镜像
VERSION=$(extract_version "$(basename ../../libs/natsjob-*-linux-amd64)")
echo "Building image for version: ${VERSION}"
docker build --platform linux/amd64 -t "luanxinghai/natsjob:${VERSION}" .

# ARM64 构建
cd ../arm/
rm -f natsjob
cp ../../libs/natsjob-*-linux-arm64 ./natsjob
chmod +x ./natsjob

# 提取版本号并构建镜像
VERSION=$(extract_version "$(basename ../../libs/natsjob-*-linux-arm64)")
echo "Building image for version: ${VERSION}"
docker build --platform linux/arm64 -t "luanxinghai/natsjob:${VERSION}-arm" .
