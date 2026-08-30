SHELL := /bin/bash

YARN ?= yarn
BROWSER ?= /usr/bin/chromium
PDF ?= picoos-presentation.pdf
PDF_CHUNK_SIZE ?= 20

.PHONY: generate-presentation-pdf build-static-presentation launch-presentation-in-browser launch-presentation-with-selectable-text all

all: generate-presentation-pdf

build-static-presentation:
	$(YARN) build

generate-presentation-pdf:
	@set -euo pipefail; \
	if ! [[ "$(PDF_CHUNK_SIZE)" =~ ^[1-9][0-9]*$$ ]]; then \
		echo "PDF_CHUNK_SIZE must be a positive integer" >&2; \
		exit 1; \
	fi; \
	slide_count="$$(awk '$$0 == "---" { count++ } END { print count - 1 }' slides.md)"; \
	build_dir="$$(mktemp -d)"; \
	trap 'rm -rf "$$build_dir"' EXIT; \
	chunks=(); \
	for ((start = 1; start <= slide_count; start += $(PDF_CHUNK_SIZE))); do \
		end=$$((start + $(PDF_CHUNK_SIZE) - 1)); \
		if ((end > slide_count)); then end="$$slide_count"; fi; \
		chunk="$${build_dir}/slides-$$(printf '%04d' "$$start").pdf"; \
		$(YARN) export --per-slide --range "$$start-$$end" --output "$$chunk" --executable-path "$(BROWSER)"; \
		chunks+=("$$chunk"); \
	done; \
	pdfunite "$${chunks[@]}" "$(PDF)"

launch-presentation-in-browser:
	$(YARN) dev

launch-presentation-with-selectable-text:
	$(YARN) dev:selectable-text
