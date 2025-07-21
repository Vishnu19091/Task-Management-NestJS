<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Task Management Backend API

## Project setup

### local usage

I have pushed a image of this backend app in DockerHub.

```bash
docker pull vishnu1183/task-management-nestjs:latest
```

Then do **docker compose up -d**

docker-compose.yml

```bash
version: "3.9"

services:
  nest-app:
    image: vishnu1183/task-management-nestjs:latest
    container_name: nestjs-app
    depends_on:
      - postgres
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - STAGE=prod
      - DB_HOST=postgres # DB_HOST_NAME
      - DB_PORT=5432
      - DB_USERNAME=postgres
      - DB_PASSWORD=password
      - DB_DATABASE=task-management # Don't change this DB_NAME

  postgres:
    image: postgres:15-alpine
    container_name: postgres-nest
    restart: always
    ports:
      - "5431:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: task-management

    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:

```

## Deployment

Used [Tailscale](https://tailscale.com/kb/1223/funnel) for backend hosting and [Docker](https://docs.docker.com/get-started/) for containerization.

## Stay in touch

- Author - [Vishnu VT](#)
- Website - [Portfolio](https://vishnu-portfolio-blue.vercel.app/)
- [LinkedIn](https://www.linkedin.com/in/vishnuvt1183/)
