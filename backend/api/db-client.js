import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI); // Vercel में ये Variable सेट करना होगा
};

export default connectDB;