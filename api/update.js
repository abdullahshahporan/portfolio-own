import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'portfolio';

let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection('sitedata');

    // Verify admin password
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No authorization token' });
    }

    const token = authHeader.split(' ')[1];
    const existing = await collection.findOne({ _id: 'portfolio' });
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Check password: use DB value if exists, otherwise env variable
    const storedPassword = existing?.adminPassword || adminPassword;
    if (token !== storedPassword) {
      return res.status(403).json({ error: 'Invalid password' });
    }

    // Update the data
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: 'No data provided' });
    }

    await collection.replaceOne(
      { _id: 'portfolio' },
      { _id: 'portfolio', ...data },
      { upsert: true }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('POST /api/update error:', error);
    return res.status(500).json({ error: 'Failed to update data' });
  }
}
