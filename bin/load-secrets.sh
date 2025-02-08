#!/bin/env bash

microk8s kubectl create secret generic deploy-config --from-env-file=secrets.env
