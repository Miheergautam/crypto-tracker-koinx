# Crypto Tracker - KoinX 

This is a cryptocurrency tracker system consisting of two Node.js services:
- **api-server**: Exposes REST APIs to fetch real-time and historical stats of selected cryptocurrencies.
- **worker-server**: Runs a background job every 15 minutes and sends a Kafka event to the API server to fetch fresh stats.

## Tech Stack
- Node.js
- MongoDB Atlas
- Kafka (via Docker Compose)
- Express.js


## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Miheergautam/crypto-tracker-koinx.git
cd crypto-tracker-koinx
```

2. Start Kafka using Docker Compose:
```bash
docker-compose up -d
```

3. Set up MongoDB Atlas and update `.env` files in both servers.

### Environment Variables
`.env` file:
```
MONGO_URI=your_mongodb_uri
PORT=your_port_no
COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
```

4. Start both servers in separate terminals:
```bash
# In one terminal
cd api-server
npm install
node index.js

# In another terminal
cd worker-server
npm install
node index.js
```

## Endpoints
* `GET /stats?coin=bitcoin`
* `GET /deviation?coin=bitcoin`

## API Server Details

### Endpoints

#### GET /stats
Query Params:
- `coin=bitcoin`

Response:
```json
{
  "price": 40000,
  "usd_market_cap": 800000000,
  "usd_24h_change": 3.4
}
```

#### GET /deviation
Query Params:
- `coin=bitcoin`

Response:
```json
{
  "deviation": 4082.48
}
```

### Kafka Setup
* Topic: `crypto-tracker-topic`
* Listens for message `{ "trigger": "update" }` to run `storeCryptoStats()`.



## Worker Server Details

### Functionality
- Every 15 minutes, it sends:
```json
{
  "trigger": "update"
}
```
to the Kafka topic `crypto-tracker-topic`.


### Kafka Message Format
```json
{
  "trigger": "update"
}
```
This message is consumed by the API server which then fetches and stores the latest crypto stats.