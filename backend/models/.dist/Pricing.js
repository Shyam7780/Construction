import mongoose from 'mongoose';
const PricingSchema = new mongoose.Schema({
  id: Number,
  rate_per_sqft: Number,
  description: String
});
export default mongoose.models.Pricing || mongoose.model('Pricing', PricingSchema);