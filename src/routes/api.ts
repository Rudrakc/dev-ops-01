import { Router } from 'express';
import { TodoController } from '../controllers/todoController';

const router = Router();
const todoController = new TodoController();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});

// Todo routes
router.get('/todos', (req, res) => todoController.getAllTodos(req, res));
router.get('/todos/:id', (req, res) => todoController.getTodoById(req, res));
router.post('/todos', (req, res) => todoController.createTodo(req, res));
router.patch('/todos/:id/toggle', (req, res) => todoController.toggleTodo(req, res));
router.delete('/todos/:id', (req, res) => todoController.deleteTodo(req, res));

export default router;
