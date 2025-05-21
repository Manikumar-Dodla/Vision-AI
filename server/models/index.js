import express from 'express';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import uploadRoutes from '../routes/upload.js'; // ✅ import route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ extended: true, limit: '1000mb' }));

// 🧠 Use the upload route
app.use('/api', uploadRoutes);

// (other routes like /api/auth/signup, /api/classify, etc... go here)



// MongoDB connection
const client = new MongoClient(process.env.MONGODB_URI);
console.log('Connecting to:', process.env.MONGODB_URI);
let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('users');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

connectDB();

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// === AUTH ROUTES ===

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await db.collection('Login').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection('Login').insertOne({
      email,
      password: hashedPassword,
      username,
      createdAt: new Date()
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.collection('Login').findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid Email' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

app.get('/api/auth/user', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// === LANGCHAIN ROUTE ===

app.post('/api/classify', async (req, res) => {
  const { prompt } = req.body;

  try {
    const classification = await classifyPrompt(prompt);
    res.json({ classification });
  } catch (err) {
    console.error('LLM Classification Error:', err);
    res.status(500).json({ error: 'Failed to classify prompt' });
  }
});


// === START SERVER ===

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
