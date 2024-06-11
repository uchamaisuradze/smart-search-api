# Smart Search API

## Setup Instructions

### Step 1: Clone the repository

```bash
git clone <repository-url>
cd smart-search
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Set up the environment

Update the `DATABASE_URL` in `.env` file if needed:

```env
DATABASE_URL="postgresql://root:root@localhost:5432/smart_search_db?schema=public"
DATABASE_NAME="smart_search_db"
```

### Step 4: Set up the database

Run the setup command to create the database, apply migrations, and seed the database:

```bash
npm run setup
```

### Step 5: Start the development server

```bash
npm run dev
```

## API Endpoints

### `GET /search?q=<searchTerm>`

Search for entities based on the search term.

**Examples:**

- `GET /search?q=McDonald's`:

  ```json
  [
    {
      "brand": { "id": 4, "name": "McDonald's" }
    }
  ]
  ```

- `GET /search?q=McDonald's in London`:

  ```json
  [
    {
      "city": { "id": 1, "name": "London" },
      "brand": { "id": 4, "name": "McDonald's" }
    }
  ]
  ```

- `GET /search?q=vegan sushi in London`:
  ```json
  [
    {
      "city": { "id": 1, "name": "London" },
      "diet": { "id": 1, "name": "Vegan" },
      "dishType": { "id": 72, "name": "Sushi" }
    },
    {
      "city": { "id": 1, "name": "London" },
      "diet": { "id": 1, "name": "Vegan" },
      "brand": { "id": 15, "name": "Sushimania" }
    }
  ]
  ```

## Scripts

- `npm run start`: Start the server
- `npm run dev`: Start the server with nodemon for development
- `npm run migrate`: Run Prisma migrations
- `npm run seed`: Seed the database
- `npm run format`: Format the codebase with Prettier
- `npm run setup-db`: Create the database
- `npm run setup`: Set up the database, run migrations, and seed the database
