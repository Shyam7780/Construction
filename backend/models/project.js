import mongoose from 'mongoose';
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  budget: Number,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);