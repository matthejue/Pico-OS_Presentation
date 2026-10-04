SHELL := /bin/bash

YARN ?= yarn
BROWSER ?= /usr/bin/chromium
PDF ?= picoos-presentation.pdf
PDF_CHUNK_SIZE ?= 20
SLIDES_SHORT ?= 0
STATIC_ARCHIVE ?= picoos-presentation-static.tar.gz
STATIC_DIRECTORY ?= picoos-presentation-static
STATIC_BUILD_DIRECTORY ?= dist

.PHONY: apply-short-version-selection sync-short-version-selection test-short-version generate-presentation-pdf generate-short-presentation-pdf build-static-presentation build-short-static-presentation package-static-presentation package-short-static-presentation launch-presentation-in-browser launch-short-presentation-in-browser launch-presentation-with-selectable-text launch-short-presentation-with-selectable-text all

all: generate-presentation-pdf

build-static-presentation:
	SLIDES_SHORT=$(SLIDES_SHORT) $(YARN) build --router-mode hash --out "$(STATIC_BUILD_DIRECTORY)"

build-short-static-presentation:
	$(MAKE) build-static-presentation SLIDES_SHORT=1 STATIC_BUILD_DIRECTORY=dist-short

package-static-presentation: build-static-presentation
	@set -euo pipefail; \
	package_dir="$$(mktemp -d)"; \
	trap 'rm -rf "$$package_dir"' EXIT; \
	mkdir "$$package_dir/$(STATIC_DIRECTORY)"; \
	cp -a "$(STATIC_BUILD_DIRECTORY)/." "$$package_dir/$(STATIC_DIRECTORY)/"; \
	install -m 755 scripts/start-presentation.sh "$$package_dir/$(STATIC_DIRECTORY)/start-presentation.sh"; \
	cp docs/static-presentation.md "$$package_dir/$(STATIC_DIRECTORY)/README.md"; \
	tar -czf "$(STATIC_ARCHIVE)" -C "$$package_dir" "$(STATIC_DIRECTORY)"

package-short-static-presentation:
	$(MAKE) package-static-presentation SLIDES_SHORT=1 STATIC_BUILD_DIRECTORY=dist-short STATIC_ARCHIVE=picoos-presentation-short-static.tar.gz STATIC_DIRECTORY=picoos-presentation-short-static

generate-presentation-pdf:
	@set -euo pipefail; \
	if ! [[ "$(PDF_CHUNK_SIZE)" =~ ^[1-9][0-9]*$$ ]]; then \
		echo "PDF_CHUNK_SIZE must be a positive integer" >&2; \
		exit 1; \
	fi; \
	slide_count="$$(SLIDES_SHORT=$(SLIDES_SHORT) node scripts/count-presentation-slides.mjs)"; \
	build_dir="$$(mktemp -d)"; \
	trap 'rm -rf "$$build_dir"' EXIT; \
	chunks=(); \
	for ((start = 1; start <= slide_count; start += $(PDF_CHUNK_SIZE))); do \
		end=$$((start + $(PDF_CHUNK_SIZE) - 1)); \
		if ((end > slide_count)); then end="$$slide_count"; fi; \
		chunk="$${build_dir}/slides-$$(printf '%04d' "$$start").pdf"; \
		SLIDES_SHORT=$(SLIDES_SHORT) $(YARN) export --per-slide --range "$$start-$$end" --output "$$chunk" --executable-path "$(BROWSER)"; \
		chunks+=("$$chunk"); \
	done; \
	pdfunite "$${chunks[@]}" "$${build_dir}/merged.pdf"; \
	SLIDES_SHORT=$(SLIDES_SHORT) node scripts/link-presentation-pdf.mjs "$${build_dir}/merged.pdf" "$(PDF)"

generate-short-presentation-pdf:
	$(MAKE) generate-presentation-pdf SLIDES_SHORT=1 PDF=picoos-presentation-short.pdf

launch-presentation-in-browser:
	SLIDES_SHORT=$(SLIDES_SHORT) $(YARN) dev

launch-short-presentation-in-browser: SLIDES_SHORT = 1
launch-short-presentation-in-browser: launch-presentation-in-browser

launch-presentation-with-selectable-text:
	SLIDES_SHORT=$(SLIDES_SHORT) $(YARN) dev:selectable-text

launch-short-presentation-with-selectable-text: SLIDES_SHORT = 1
launch-short-presentation-with-selectable-text: launch-presentation-with-selectable-text

apply-short-version-selection:
	node scripts/apply-short-version.mjs

sync-short-version-selection:
	node scripts/sync-short-version-selection.mjs

test-short-version:
	node scripts/test-short-version.mjs
