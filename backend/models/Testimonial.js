import mongoose from 'mongoose';
const TestimonialSchema = new mongoose.Schema({
  name: String,
  content: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);