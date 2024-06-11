import express from 'express';
import { config } from 'dotenv';
import { extractEntities } from './extractEntities.js';

config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Smart Search API');
});

app.get('/search', async (req, res) => {
  const searchTerm = req.query.q;
  const entities = await extractEntities(searchTerm);
  res.json(entities);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
