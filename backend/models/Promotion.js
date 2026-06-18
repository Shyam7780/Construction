import mongoose from 'mongoose';
const PromotionSchema = new mongoose.Schema({
  id: Number,
  title: String,
  discount: String,
  description: String
});
export default mongoose.models.Promotion || mongoose.model('Promotion', PromotionSchema);