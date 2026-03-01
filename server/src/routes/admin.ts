import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import { authenticateToken, generateToken, AuthRequest } from '../middleware/auth.js';

export const adminRouter = Router();

// Login
adminRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const admin = await prisma.adminUser.findUnique({ where: { email } });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(admin.id);

    res.json({ token, email: admin.email });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify token
adminRouter.get('/verify', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const admin = await prisma.adminUser.findUnique({
      where: { id: req.userId },
      select: { email: true }
    });

    if (!admin) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ email: admin.email });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get settings
adminRouter.get('/settings', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const settings = await prisma.setting.findMany();

    const settingsObj: Record<string, string> = {};
    settings.forEach(s => {
      settingsObj[s.key] = s.key === 'gemini_api_key' ? '***hidden***' : s.value;
    });

    res.json(settingsObj);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update settings
adminRouter.post('/settings', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { key, value } = req.body;

    if (!key || value === undefined) {
      return res.status(400).json({ error: 'Key and value required' });
    }

    const setting = await prisma.setting.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });

    res.json({ key: setting.key, value: setting.key === 'gemini_api_key' ? '***hidden***' : setting.value });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create initial admin (for setup)
adminRouter.post('/setup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const existing = await prisma.adminUser.findUnique({ where: { email } });

    if (existing) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.adminUser.create({
      data: { email, password: hashedPassword }
    });

    res.json({ id: admin.id, email: admin.email });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
