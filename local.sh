#!/bin/bash

# Build application express
cd app/ && pnpm run build

cd ../

# Build application aws-sam and lanch locally
sam build && sam local start-api --env-vars app/env.json --skip-pull-image
