import connectDB from '../db-client.js'; // यहाँ आपका नया Mongoose कनेक्शन है
import Inquiry from '../models/Inquiry.js'; // आपका Mongoose मॉडल

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    await connectDB(); // डेटाबेस से कनेक्ट करें

    if (req.method === 'GET') {
      const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
      return res.status(200).json(inquiries);
    }

    if (req.method === 'POST') {
      const newInquiry = await Inquiry.create({ ...req.body, verified: true });
      return res.status(201).json(newInquiry);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      await Inquiry.findByIdAndDelete(id);
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}