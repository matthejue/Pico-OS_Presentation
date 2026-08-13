YARN ?= yarn
BROWSER ?= /usr/bin/chromium

.PHONY: generate-presentation-pdf build-static-presentation launch-presentation-in-browser all

all: generate-presentation-pdf

build-static-presentation:
	$(YARN) build

generate-presentation-pdf:
	$(YARN) export --executable-path $(BROWSER)

launch-presentation-in-browser:
	$(YARN) dev
