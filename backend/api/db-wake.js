import mongoose from 'mongoose';

// अब हम किसी API URL को कॉल करने के बजाय, सीधे MongoDB कनेक्शन को 'वेक' (चेक) करेंगे
let _wakeTriggered = false;

export function triggerWake() {
  // अगर कनेक्शन पहले से ही रेडी है, तो कुछ न करें
  if (_wakeTriggered || mongoose.connections[0].readyState === 1) return;
  
  _wakeTriggered = true;
  console.log("Waking up MongoDB connection...");
  
  // कनेक्शन को फिर से जोड़ने की कोशिश करें
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB woken up!"))
    .catch((err) => console.error("Wake-up failed:", err));

  // 60 सेकंड का कूलडाउन ताकि बार-बार रिक्वेस्ट न जाए
  setTimeout(() => { _wakeTriggered = false; }, 60000);
}