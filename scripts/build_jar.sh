#! /bin/bash

set -e

BASE_DIR="$(dirname $( cd "$(dirname "$0")" ; pwd -P ))"

pushd ${BASE_DIR}/client
    yarn install
    yarn build
popd

pushd ${BASE_DIR}
    mvn -Dflyway.user=${FRITZ_DB_USERNAME} -Dflyway.password= -Dflyway.url=${FRITZ_DB_URL} clean flyway:migrate package -DskipTests
popd