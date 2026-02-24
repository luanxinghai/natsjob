#!/bin/bash
# 将上级libs下 natsjob-开头的都打包为tar
cd ../libs
for i in `ls . | grep natsjob-`; do
    echo "tar $i"
    tar -zcvf $i.tar.gz $i
done

echo "tar completed!"

