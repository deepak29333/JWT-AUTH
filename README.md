# JWT-AUTH

#steps to run project

1. create a databse using docker 
RUN sudo apt install docker.io
RUN docker run --name auth-app -e POSTGRES_PASSWORD=asdf -e POSTGRES_DB=auth-app -d -p 5432:5432 postgres

2. create redis server using docker
RUN  docker run --name auth-redis -p 6379:6379 -d redis

3. create dabatase connection
create .env file and copy the below line
DATABASE_URL="postgres://postgres:asdf@localhost:5432/auth-app?schema=public"

4. yarn install

5. yarn dev

