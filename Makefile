# Makefile

.PHONY: start

start:
	# クライアント側を起動
	cd client && npm run dev & \
	# バックエンド側を起動
	node backend/index.js
