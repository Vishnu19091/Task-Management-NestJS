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
      - DATABASE_URL=postgres://postgres:postgres@postgres:5432/task-management

  postgres:
    image: postgres:15-alpine
    container_name: postgres-nest
    restart: always
    ports:
      - "5432:5432" #Make sure there no other services running on this port in your machine.
    environment:
      POSTGRES_USER: user_name
      POSTGRES_PASSWORD: user_password
      POSTGRES_DB: task-management #This auto-creates a database in the container.

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
<!-- - LinkedIn - https:// -->
