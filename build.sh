#!/bin/bash

case `uname -s` in
  MINGW*)
    USER_UID=1000
    GROUP_UID=1000
    ;;
  *)
    if [ -z ${USER_UID:+x} ]
    then
      USER_UID=`id -u`
      GROUP_GID=`id -g`
    fi
esac

createApplication () {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" gradle gradle createApplication --no-daemon
}

createWidget () {
  docker-compose run --rm -u "$USER_UID:$GROUP_GID" gradle gradle createWidget --no-daemon
}

for param in "$@"
do
  case $param in
    createApplication)
      createApplication
      ;;
    createWidget)
      createWidget
      ;;
    *)
      echo "Invalid argument : $param"
  esac
  if [ ! $? -eq 0 ]; then
    exit 1
  fi
done
