import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const uri = process.env.MONGODB_URI;
  const adminPwd = process.env.ADMIN_PASSWORD;
  
  const result = {
    MONGODB_URI_set: !!uri,
    MONGODB_URI_prefix: uri ? uri.substring(0, 30) + '...' : 'NOT SET',
    ADMIN_PASSWORD_set: !!adminPwd,
    connection: 'not tested',
    database: 'not tested',
    document: 'not tested',
  };

  if (!uri) {
    result.connection = 'SKIPPED - no MONGODB_URI';
    return res.status(200).json(result);
  }

  try {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    await client.connect();
    result.connection = 'SUCCESS';

    const db = client.db(process.env.MONGODB_DB || 'portfolio');
    const collection = db.collection('sitedata');
    
    const doc = await collection.findOne({ _id: 'portfolio' });
    result.database = 'SUCCESS';
    result.document = doc ? 'EXISTS (keys: ' + Object.keys(doc).length + ')' : 'NOT FOUND (empty DB - first save will create it)';
    
    await client.close();
  } catch (error) {
    result.connection = 'FAILED: ' + error.message;
  }

  return res.status(200).json(result);
}
