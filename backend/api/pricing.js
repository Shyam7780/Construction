import connectDB from '../db-client.js';
import Pricing from '../models/Pricing.js'; // आपको Pricing मॉडल बनाना होगा

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    await connectDB();

    if (req.method === 'GET') {
      const rates = await Pricing.find({}).sort({ id: 1 });
      return res.status(200).json(rates);
    }

    if (req.method === 'PUT') {
      const { id, rate_per_sqft } = req.body;
      const updatedRate = await Pricing.findOneAndUpdate(
        { id: id }, 
        { rate_per_sqft }, 
        { new: true }
      );
      return res.status(200).json(updatedRate);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}