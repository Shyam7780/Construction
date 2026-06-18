import connectDB from '../db-client.js';
import Testimonial from '../models/Testimonial.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    await connectDB();

    if (req.method === 'GET') {
      const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
      return res.status(200).json(testimonials);
    }

    if (req.method === 'POST') {
      const newTestimonial = await Testimonial.create(req.body);
      return res.status(201).json(newTestimonial);
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}