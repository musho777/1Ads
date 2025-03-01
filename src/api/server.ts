import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { campaignRoutes } from './routes/campaigns';
import { errorHandler } from './middleware/errorHandler';
import { validateApiKey } from './middleware/auth';

const app = express();
const port = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com', /\.yourdomain\.com$/]
    : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400, // 24 hours
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(compression());
app.use(express.json());

// API Documentation
const swaggerDocument = require('./openapi.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API Version prefix
const API_VERSION = '/api/v1';

// Auth middleware
app.use(`${API_VERSION}/*`, validateApiKey);

// Routes
app.use(`${API_VERSION}/campaigns`, campaignRoutes);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});