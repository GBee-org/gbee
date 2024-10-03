.PHONY: build

build-App:
	@echo "Starting build sam App..."

#	@echo ${ARTIFACTS_DIR}

	# Install pnpm
	@if ! command -v pnpm &> /dev/null; then \
		echo "pnpm not found, installing..."; \
		npm install -g pnpm; \
	fi

	# Install dependencies
	cd app && yes | pnpm install --prod
	
	# Build app
	cd app && pnpm run build
	
	# Clean up previous build
	rm -rf ${ARTIFACTS_DIR}
	
	# Copy files to build SAM folder
	mkdir -p .aws-sam/build/App
	cp -R app/dist/. ${ARTIFACTS_DIR}
	cp -R app/node_modules ${ARTIFACTS_DIR}

	@echo "Build completed for sam App."
