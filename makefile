up:
	docker-compose up -d --build

down:
	docker-compose stop

rm: down
	docker-compose rm
