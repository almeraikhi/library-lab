# Development

## Prerequisites

### PosgresSQL 16.6

You will need a PostgreSQL 16.6 database to run the project.

You have two options:

1. Binary Installation

```bash
https://www.postgresql.org/download/
```

You will then need to create:

* A user "postgres" with password "postgres"
* A database "library"

2. Docker

```bash
docker run --name postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=library -p 5432:5432 -d postgres:16.6
```



## Running the development environment

### 1. Prepare `.env` file

* Create a `.env` file at the root of the project
* Add the following environment variable in it:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/library?schema=public"
```

> If your postgres instance is customized (e.g. different user, password, host, port, etc.), change the `DATABASE_URL` environment variable accordingly.

### 2. Install dependencies

#### Install pnpm

This project uses `pnpm` as the package manager.

```bash
npm install -g pnpm@8.15.6
```

#### install dependencies

```bash
pnpm install
```

#### Initialize the project

This command will create the database schema and run the migrations.

```bash
pnpm dx
```

#### Run the project

```bash
pnpm dev
```

This will start two development servers.

* APP: <http://localhost:5173/>
* API: <http://localhost:3010>

# HLD
Refer to the [HLD document](./docs/HLD.md)  for more details on the project.
