# Kenility Test - NestJS API

By: [Arian Angoma Vilchez](https://www.linkedin.com/in/arian-angoma-vilchez/)

## Description

This project is a NestJS API for Kenility Test. It uses MongoDB as the database and includes authentication with JWT.

## Prerequisites

- Node.js
- Yarn
- Docker
- Docker Compose

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ArianAngoma/kenility-test
    cd kenility-test
    ```

2. Copy the `.env.example` file to `.env` and fill in the required environment variables:
    ```sh
    cp .env.example .env
    ```

3. Install dependencies:
    ```sh
    yarn install
    ```

## Running the Application

### Using Docker

1. Build and start the containers:
    ```sh
    docker compose up --build
    ```

2. The API will be available at `http://localhost:3000`.

### Without Docker

1. Start MongoDB locally or use a MongoDB service.

2. Start the application:
    ```sh
    yarn start:dev
    ```

3. The API will be available at `http://localhost:3000`.

## Environment Variables

The following environment variables are used in the project:

- `PORT`: The port on which the API will run.
- `MONGO_DB_USERNAME`: The MongoDB username.
- `MONGO_DB_PASSWORD`: The MongoDB password.
- `MONGO_DB_NAME`: The MongoDB database name.
- `JWT_SECRET`: The secret key for JWT authentication.
