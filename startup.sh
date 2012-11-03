#!/bin/sh

export NODE_PATH=/opt/local/lib/node_modules/
export NODE_PATH=$NODE_PATH:`pwd`:`pwd`/common/
echo $NODE_PATH
node .


