# Docker
pin-build:
	docker build -t 389798/pin-image .
pin-rmi:
	docker rmi 389798/pin-image
pg-build:
	docker pull postgres
redis-build:
	docker pull redis
up-pin-container:
	docker build -t 389798/pin-image .
	docker run --rm -p 3500:3500 --name pin-container --env-file=./.development.env --network pinterest-network 389789/pin-image
down-pin-container:
	docker stop pin-container
inspect-pin-container:
	docker exec -it pin-container /bin/bash 
up-pg-container: 
	docker run -p 5432:5432 --rm --name postgres-pin-container --env-file=./.development.env -e POSTGRES_USER=$PG_USER -e POSTGRES_HOST_AUTH_METHOD=trust -e POSTGRES_DB=$PG_DB -e POSTGRES_PASSWORD=$PG_PASSWORD -v ./pg_data:/var/lib/postgresql/data postgres:14
down-pg-container:
	docker stop postgres-pin-container
inspect-pg-container:
	docker exec -it postgres-pin-container /bin/bash
up-redis-container:
	docker run --rm -p 6379:6379 -d --name redis-pin-container --network pinterest-network redis
down-redis-container:
	docker stop redis-pin-container
inspect-redis-container:
	docker exec -it redis-pin-container redis-server

compose-up:
	docker-compose up
compose-down:
	docker-compose down 

compose-start-life:
	docker build -t 389798/pin-image .
	docker-compose up
	
compose-end-life:
	docker-compose down
	docker-compose stop 
	docker rmi 389798/pin-image

# Tests
unit-tests:
	npm run test:watch

e2e-tests:
	npm run test:e2e:watch
 