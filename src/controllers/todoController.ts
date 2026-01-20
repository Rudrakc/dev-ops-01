import { Request, Response } from 'express';
import { TodoService } from '../services/todoService';
import { CreateTodoRequest } from '../models/todo';

const todoService = new TodoService();

export class TodoController {
  /**
   * GET /api/todos - Get all todos
   */
  getAllTodos(req: Request, res: Response): void {
    try {
      const todos = todoService.getAllTodos();
      res.status(200).json({
        success: true,
        data: todos,
        count: todos.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch todos',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * GET /api/todos/:id - Get a todo by ID
   */
  getTodoById(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const todo = todoService.getTodoById(id);

      if (!todo) {
        res.status(404).json({
          success: false,
          message: `Todo with id ${id} not found`
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: todo
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch todo',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * POST /api/todos - Create a new todo
   */
  createTodo(req: Request, res: Response): void {
    try {
      const { title, description } = req.body;

      if (!title || typeof title !== 'string' || title.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'Title is required and must be a non-empty string'
        });
        return;
      }

      if (!description || typeof description !== 'string' || description.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'Description is required and must be a non-empty string'
        });
        return;
      }

      const createRequest: CreateTodoRequest = {
        title: title.trim(),
        description: description.trim()
      };

      const newTodo = todoService.createTodo(createRequest);
      res.status(201).json({
        success: true,
        data: newTodo,
        message: 'Todo created successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to create todo',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * PATCH /api/todos/:id/toggle - Toggle todo completion status
   */
  toggleTodo(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const todo = todoService.toggleTodo(id);

      if (!todo) {
        res.status(404).json({
          success: false,
          message: `Todo with id ${id} not found`
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: todo,
        message: 'Todo status updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update todo',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * DELETE /api/todos/:id - Delete a todo
   */
  deleteTodo(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const deleted = todoService.deleteTodo(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: `Todo with id ${id} not found`
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Todo deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete todo',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}
