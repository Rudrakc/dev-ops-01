import express, { Express } from 'express';
import cors from 'cors';
import apiRoutes from './routes/api';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'DevOps CI/CD Project - Todo API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      todos: '/api/todos'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`API base: http://localhost:${PORT}/api`);
});

export default app;
