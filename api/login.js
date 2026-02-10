import { MongoClient, ObjectId } from 'mongodb';
import crypto from 'crypto';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'portfolio';

let cachedClient = null;

async function connectToDatabase() {
  if (!uri) return null;
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  await client.connect();
  cachedClient = client;
  return client;
}

// Generate a simple HMAC token from the password so the raw password is never sent to the client
function generateToken(password) {
  const secret = process.env.TOKEN_SECRET || process.env.MONGODB_URI || 'portfolio-secret';
  return crypto.createHmac('sha256', secret).update(password).digest('hex');
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

    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    // Try MongoDB first for stored password
    let storedPassword = adminPassword;
    try {
      const client = await connectToDatabase();
      if (client) {
        const db = client.db(dbName);
        const collection = db.collection('sitedata');
        const existing = await collection.findOne({ _id: 'portfolio' });
        if (existing?.adminPassword) {
          storedPassword = existing.adminPassword;
        }
      }
    } catch (dbError) {
      console.error('MongoDB connection failed, using env password:', dbError.message);
    }

    if (password === storedPassword) {
      return res.status(200).json({ success: true, token: generateToken(storedPassword) });
    }

    return res.status(403).json({ error: 'Invalid password' });
  } catch (error) {
    console.error('POST /api/login error:', error);
    return res.status(500).json({ error: 'Server error: ' + error.message });
  }
}
