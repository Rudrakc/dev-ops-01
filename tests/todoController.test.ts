import { Request, Response } from 'express';
import { TodoController } from '../src/controllers/todoController';
import { TodoService } from '../src/services/todoService';

// Mock the TodoService
jest.mock('../src/services/todoService');

describe('TodoController', () => {
  let todoController: TodoController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockTodoService: jest.Mocked<TodoService>;

  beforeEach(() => {
    todoController = new TodoController();
    mockTodoService = new TodoService() as jest.Mocked<TodoService>;
    
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  describe('getAllTodos', () => {
    it('should return all todos with success status', () => {
      const mockTodos = [
        { id: '1', title: 'Todo 1', description: 'Desc 1', completed: false, createdAt: new Date() }
      ];
      
      // Mock the service method
      jest.spyOn(TodoService.prototype, 'getAllTodos').mockReturnValue(mockTodos);

      todoController.getAllTodos(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockTodos,
        count: mockTodos.length
      });
    });
  });

  describe('getTodoById', () => {
    it('should return 404 if todo not found', () => {
      mockRequest.params = { id: '999' };
      jest.spyOn(TodoService.prototype, 'getTodoById').mockReturnValue(undefined);

      todoController.getTodoById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Todo with id 999 not found'
      });
    });

    it('should return todo if found', () => {
      const mockTodo = {
        id: '1',
        title: 'Test Todo',
        description: 'Test Description',
        completed: false,
        createdAt: new Date()
      };
      
      mockRequest.params = { id: '1' };
      jest.spyOn(TodoService.prototype, 'getTodoById').mockReturnValue(mockTodo);

      todoController.getTodoById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockTodo
      });
    });
  });

  describe('createTodo', () => {
    it('should return 400 if title is missing', () => {
      mockRequest.body = { description: 'Test description' };

      todoController.createTodo(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Title is required and must be a non-empty string'
      });
    });

    it('should return 400 if description is missing', () => {
      mockRequest.body = { title: 'Test title' };

      todoController.createTodo(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Description is required and must be a non-empty string'
      });
    });

    it('should create todo successfully with valid data', () => {
      const mockTodo = {
        id: '1',
        title: 'New Todo',
        description: 'New Description',
        completed: false,
        createdAt: new Date()
      };

      mockRequest.body = { title: 'New Todo', description: 'New Description' };
      jest.spyOn(TodoService.prototype, 'createTodo').mockReturnValue(mockTodo);

      todoController.createTodo(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockTodo,
        message: 'Todo created successfully'
      });
    });
  });
});
