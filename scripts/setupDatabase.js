import { config } from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;

config();

const databaseName = process.env.DATABASE_NAME;

async function createDatabase() {
  const client = new Client({
    user: 'root',
    host: 'localhost',
    password: 'root',
    port: 5432,
  });

  try {
    await client.connect();
    await client.query(`CREATE DATABASE ${databaseName}`);
    console.log(`Database ${databaseName} created successfully!`);
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
}

createDatabase();
