import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { extractPayslipData } from './utils/payslipParser.js';
import { generateMotivationalQuote } from './utils/quoteGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Payslip Celebration API! 🎉', version: '1.0.0' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/api/payslip/parse', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const pdfBuffer = require('fs').readFileSync(req.file.path);
    const payslipData = await extractPayslipData(pdfBuffer);
    
    res.json({
      success: true,
      data: payslipData,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse payslip', details: error.message });
  }
});

app.post('/api/quote/generate', (req, res) => {
  try {
    const { salary, isFirstPayslip, previousSalary } = req.body;

    if (!salary) {
      return res.status(400).json({ error: 'Salary is required' });
    }

    const quote = generateMotivationalQuote(salary, isFirstPayslip || false, previousSalary);
    
    res.json({
      success: true,
      quote,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate quote', details: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log('✅ Payslip Celebration API running on http://localhost:' + PORT);
  console.log('📚 API Documentation:');
  console.log('  POST /api/payslip/parse - Upload and parse payslip PDF');
  console.log('  POST /api/quote/generate - Generate motivational quote');
});
