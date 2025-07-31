<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Task Management Backend API

TASK MANAGEMENT API

Image of this backend app is available in DockerHub.

```bash
docker pull vishnu1183/task-management-nestjs:latest
```

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
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_USERNAME=postgres
      - DB_PASSWORD=YOUR_PASSWORD
      - DB_DATABASE=task-management
      - JWT_SECRET=YOUR_JWT_SECRET

  postgres:
    image: postgres:15-alpine
    container_name: postgres-nest
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: YOUR_PASSWORD
      POSTGRES_DB: task-management

    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

## Deployment

Used [Tailscale](https://tailscale.com/kb/1223/funnel) for backend hosting and [Docker](https://docs.docker.com/get-started/) for containerization.

> **Tailscale** is a VPN tool. Unlike typical VPN this creates a P2P mesh network. I have a home server and I can't expose it to the internet by port forwarding. Instead, I'm using tailscale to securely access it, and it also provides free DNS, so I made use of it.

## Stay in touch

- Author - [Vishnu VT](#)
- Website - [Portfolio](https://vishnu-portfolio-blue.vercel.app/)
- [LinkedIn](https://www.linkedin.com/in/vishnuvt1183/)
