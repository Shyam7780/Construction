import mongoose from 'mongoose';
const InquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  verified: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);