# Ticketing Microservices (Structured)

This repo is a structured microservices backend matching your system design:

- **Gateway** (4000): single entry point + JWT check
- **Auth Service** (4001): USER + THEATER signup/login (MongoDB)
- **Tickets Service** (4002 + WS 4050): shows + seats (MongoDB), seat locks (Redis), real-time updates (WebSocket)
- **Orders Service** (4003): order lifecycle (MongoDB) + Kafka producer
- **Payments Service** (4004): payments (MongoDB) + Kafka producer

## Folder conventions
Each service uses:
- `src/models/` (MongoDB models)
- `src/routes/` (Express routes)
- `src/handlers/` (route handlers/controllers)
- `src/middleware/` (auth/validation)
- `src/config/` (env)
- `src/db/` (mongo/redis)

## Prerequisites (local)
- MongoDB running (default: `mongodb://127.0.0.1/...`)
- Redis running (default: `redis://127.0.0.1:6379`)
- Kafka broker running (default: `localhost:9092`)

## Run
Open 5 terminals and run `npm i` then `npm start` in each service folder.
