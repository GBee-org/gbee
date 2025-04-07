#!/bin/bash
source ~/.zshrc

# # Build application express
# cd app/ && pnpm run build

# cd ../

# # Build application aws-sam and launch locally
sam build && sam local start-api --skip-pull-image
