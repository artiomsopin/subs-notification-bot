# Custom Subscription Notification Bot

A custom bot developed using Node.js and TypeScript to notify users about expiring paid subscriptions via private messages on Telegram. This bot utilizes Long-Pooling technology and the Grammy.js library.

## Table of Contents

1. [Description](#description)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Installation](#installation)
5. [Usage](#usage)

## Features

- Notify users about expiring subscriptions via Telegram messages
- Easy configuration and setup
- Utilizes Long-Pooling technology for real-time updates

## Tech Stack

- **Language:** TypeScript
- **Runtime:** Node.js
- **Bot Framework:** Grammy.js
- **Dependency Injection:** InversifyJS
- **Database:** PostgreSQL
- **ORM:** Prisma

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/artiomsopin/subs-notification-bot
    cd your-repo-name
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the environment variables (create a `.env` file in the root directory):
    ```env
    TELEGRAM_BOT_TOKEN=your-telegram-bot-token
    DATABASE_URL=your-postgresql-database-url
    ```

4. Run the database migrations:
    ```bash
    npx prisma migrate dev
    ```

## Usage

To start the bot, run:
```bash
npm run start:dev
