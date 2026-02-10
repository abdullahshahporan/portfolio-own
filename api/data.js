import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'portfolio';

let cachedClient = null;

async function connectToDatabase() {
  if (!uri) throw new Error('MONGODB_URI environment variable is not set');
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection('sitedata');

    const doc = await collection.findOne({ _id: 'portfolio' });

    if (!doc) {
      return res.status(200).json({ data: null });
    }

    // Remove internal fields before sending to frontend
    const { _id, ...data } = doc;
    return res.status(200).json({ data });
  } catch (error) {
    console.error('GET /api/data error:', error);
    return res.status(500).json({ error: 'Failed to fetch data: ' + error.message });
  }
}
