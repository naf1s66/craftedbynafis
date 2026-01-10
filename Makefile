PKG_MGR ?= pnpm

.PHONY: install
install:
	$(PKG_MGR) install

.PHONY: dev
dev:
	$(PKG_MGR) dev

.PHONY: build
build:
	$(PKG_MGR) build

.PHONY: lint
lint:
	$(PKG_MGR) lint

.PHONY: typecheck
typecheck:
	$(PKG_MGR) typecheck

.PHONY: format
format:
	$(PKG_MGR) format

.PHONY: ci
ci: lint typecheck build
