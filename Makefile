YARN ?= yarn
BROWSER ?= /usr/bin/chromium

.PHONY: generate-presentation-pdf build-static-presentation launch-presentation-in-browser launch-presentation-with-selectable-text all

all: generate-presentation-pdf

build-static-presentation:
	$(YARN) build

generate-presentation-pdf:
	$(YARN) export --per-slide --executable-path $(BROWSER)

launch-presentation-in-browser:
	$(YARN) dev

launch-presentation-with-selectable-text:
	$(YARN) dev:selectable-text
