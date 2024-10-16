# Cryptocurrency Price Tracker

This repository contains an implementation of a background job and an API service to fetch and store details about three cryptocurrencies (Bitcoin, Matic, and Ethereum) using the CoinGecko API. It also provides two APIs: one for fetching the latest data and another for calculating the standard deviation of the price for the last 100 records.

### Link

    https://koinx-assesment-awd7hvh4h3a7ggf8.centralindia-01.azurewebsites.net/

## Features

1. **Background Job**: Runs every two hours to fetch the current price in USD, market cap in USD, and 24-hour price change of Bitcoin, Matic, and Ethereum, and stores this data in a database.

   - Following is the link for background job:

   ```
   https://github.com/viditparashar96/koinx-cron
   ```

2. **API to Fetch Latest Data**: Fetch the latest price, market cap, and 24-hour change of a specific cryptocurrency.
3. **API to Calculate Standard Deviation**: Calculate the standard deviation of the price of a specific cryptocurrency for the last 100 records in the database.

## Setup and Installation

### Prerequisites

- Node.js
- MongoDB or any supported database for storing cryptocurrency data.
- CoinGecko API for fetching cryptocurrency data.

### Steps to Run the Project

1. Clone the repository:

   ```bash
    https://github.com/viditparashar96/koinx-backend.git

   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in a .env file:

   ```bash
    PORT=3000
    DATABASE_URL=your_database_url
    COINGECKO_API_URL=https://api.coingecko.com/api/v3/coins/markets

   ```

4. Start the server:

   ```bash
   npm run start

   ```

## Task 1: Background Job

A background job is scheduled to run every 2 hours. It fetches the following details for Bitcoin, Matic, and Ethereum using the CoinGecko API:

- Price in USD
- Market cap in USD

- bitcoin
- matic-network
- ethereum

These details are then stored in the database.

## Task 2: /stats API

This API returns the latest data about the requested cryptocurrency.

1. Endpoint:

   ```
   GET /api/v1/crypto/stats
   ```

2. Query Parameters:
   ```
   {
   "coin": "bitcoin" // Can be 'bitcoin', 'matic-network', or 'ethereum'
   }
   ```

## Task 3: /deviation API

This API returns the latest data about the requested cryptocurrency.

1. Endpoint:

   ```
   GET /api/v1/crypto/deviation
   ```

2. Query Parameters:
   ```
   {
   "coin": "bitcoin" // Can be 'bitcoin', 'matic-network', or 'ethereum'
   }
   ```
