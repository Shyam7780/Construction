import connectDB from '../db-client.js';
import Promotion from '../models/Promotion.js'; // सुनिश्चित करें कि Promotion मॉडल बना हुआ है

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    await connectDB();

    if (req.method === 'GET') {
      const promos = await Promotion.find({}).sort({ id: 1 });
      return res.status(200).json(promos);
    }

    if (req.method === 'POST') {
      const newPromo = await Promotion.create(req.body);
      return res.status(201).json(newPromo);
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      const updatedPromo = await Promotion.findOneAndUpdate(
        { id: id }, 
        updates, 
        { new: true }
      );
      return res.status(200).json(updatedPromo);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}