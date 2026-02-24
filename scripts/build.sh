#!/bin/bash

# 清理
libs_path="./libs"
mkdir -p $libs_path
rm -rf ./$libs_path/natsjob*

#合成版本号
version_main="v1.0"
version_build_date=$(date +%Y%m%d)
version="${version_main}.${version_build_date}"

#编译
buildTime=$(date +%Y%m%d%H%M%S)
export ldflags_param="-s -w -X main.Version=${version} -X main.BuildTime=${buildTime}"
export GOOS=darwin
export GOARCH=amd64
go build -ldflags "$ldflags_param" -o ./$libs_path/natsjob-$version-darwin-amd64

export GOOS=darwin
export GOARCH=arm64
go build -ldflags "$ldflags_param" -o ./$libs_path/natsjob-$version-darwin-arm64

export GOOS=linux
export GOARCH=amd64
go build -ldflags "$ldflags_param" -o ./$libs_path/natsjob-$version-linux-amd64

export GOOS=linux
export GOARCH=arm64
go build -ldflags "$ldflags_param" -o ./$libs_path/natsjob-$version-linux-arm64

export GOOS=windows
export GOARCH=amd64
go build -ldflags "$ldflags_param" -o ./$libs_path/natsjob-$version-windows-amd64.exe

export GOOS=windows
export GOARCH=arm64
go build -ldflags "$ldflags_param" -o ./$libs_path/natsjob-$version-windows-arm64.exe

echo Build completed!