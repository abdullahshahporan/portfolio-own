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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ error: 'Password required' });
    }

    const client = await connectToDatabase();
    const db = client.db(dbName);
    const collection = db.collection('sitedata');

    const existing = await collection.findOne({ _id: 'portfolio' });
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const storedPassword = existing?.adminPassword || adminPassword;

    if (password === storedPassword) {
      return res.status(200).json({ success: true, token: storedPassword });
    }

    return res.status(403).json({ error: 'Invalid password' });
  } catch (error) {
    console.error('POST /api/login error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
