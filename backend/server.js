const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Models को इम्पोर्ट करना
const Project = require('./models/Project');
const Admin = require('./models/Admin');

const app = express();

// Middleware (ताकि Frontend और Backend बात कर सकें)
app.use(cors());
app.use(express.json());

// MongoDB Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Successfully Connected! 🎉"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// टेस्टिंग राउट (Route)
app.get('/', (req, res) => {
  res.send("Construction Backend API is running!");
});


// ==========================================
// 1. PROJECTS API (कंस्ट्रक्शन प्रोजेक्ट्स के लिए)
// ==========================================

// नया प्रोजेक्ट ऐड करने की API (POST)
app.post('/api/projects', async (req, res) => {
  try {
    const { title, description, budget } = req.body;
    
    const newProject = new Project({
      title: title,
      description: description,
      budget: budget
    });

    await newProject.save();
    res.status(201).json({ message: "प्रोजेक्ट सफलतापूर्वक सेव हो गया!", project: newProject });

  } catch (error) {
    res.status(500).json({ error: "डेटा सेव करने में दिक्कत आई" });
  }
});

// सारे प्रोजेक्ट्स देखने की API (GET)
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "डेटा लाने में दिक्कत आई" });
  }
});


// ==========================================
// 2. ADMIN LOGIN API (एडमिन सिक्योरिटी के लिए)
// ==========================================

// एडमिन अकाउंट बनाने की API (सिर्फ एक बार आपका अकाउंट बनाने के लिए)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // पासवर्ड को सुरक्षित (Encrypt) करना
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // नया एडमिन सेव करना
    const newAdmin = new Admin({
      username: username,
      password: hashedPassword
    });

    await newAdmin.save();
    res.status(201).json({ message: "✅ एडमिन अकाउंट सफलतापूर्वक बन गया!" });

  } catch (error) {
    res.status(500).json({ error: "अकाउंट बनाने में दिक्कत आई" });
  }
});

// एडमिन लॉगिन करने की API
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // चेक करें कि क्या इस नाम का एडमिन है
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ error: "❌ यूज़रनेम गलत है!" });
    }

    // पासवर्ड चेक करें
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "❌ पासवर्ड गलत है!" });
    }

    // लॉगिन सफल होने पर पास (Token) बनाना
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ message: "✅ Login Successful!", token: token });

  } catch (error) {
    res.status(500).json({ error: "लॉगिन में दिक्कत आई" });
  }
});


// ==========================================
// 3. SERVER START (सर्वर चालू करना)
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});