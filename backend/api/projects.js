import connectDB from '../db-client.js';
import Project from '../models/Project.js'; // सुनिश्चित करें कि Project मॉडल बना हुआ है

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    await connectDB();

    if (req.method === 'GET') {
      const projects = await Project.find({}).sort({ createdAt: -1 });
      return res.status(200).json(projects);
    }

    if (req.method === 'POST') {
      const newProject = await Project.create(req.body);
      return res.status(201).json(newProject);
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      const updatedProject = await Project.findByIdAndUpdate(id, updates, { new: true });
      return res.status(200).json(updatedProject);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      await Project.findByIdAndDelete(id);
      return res.status(200).json({ ok: true });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}