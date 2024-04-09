.PHONY: setup up d b ps web proxy logs-% clean

setup:
	@make up
	@make ps
d:
	docker compose down
up:
	docker compose up -d
ps:
	docker compose ps
web:
	docker compose exec web bash
proxy:
	docker compose exec proxy bash
logs-%:
	docker compose logs --tail=400 -f "${@:logs-%=%}"
clean:
	docker compose down --volumes --remove-orphans
