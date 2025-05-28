# Data Pusher

A lightweight tool for pushing data to various destinations with ease and flexibility.

## Features

- Supports multiple data sources and destinations

## Repository Architecture

```
data-pusher/
├── src/
│   ├── app.js         # Entry point
│   ├── config/          # Configuration handling
│   ├── destinations/    # Destination connectors (e.g., APIs, databases)
│   ├── sources/         # Data source connectors
│   └── utils/           # Utility functions
├── .config/             # Configuration files (.env, etc.)
├── package.json
└── README.md
```

- **src/**: Main application source code.
- **config/**: Handles loading and validation of configuration.
- **/src/destinations/**: Modules for pushing data to different destinations.
- **/src/dataHandler/**: Modules for pulling data from various sources.
- **.config/**: Place your `.env` and other config files here.

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### Installation

```bash
git clone https://github.com/customerLabs/data-pusher.git
cd data-pusher
npm install
```

### Usage

```bash
npm start
```

## Configuration

Create a configuration file `.config` and `.env` inside it.

