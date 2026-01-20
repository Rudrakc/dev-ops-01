import { TodoService } from '../src/services/todoService';
import { CreateTodoRequest } from '../src/models/todo';

describe('TodoService', () => {
  let todoService: TodoService;

  beforeEach(() => {
    todoService = new TodoService();
  });

  describe('getAllTodos', () => {
    it('should return an empty array initially', () => {
      const todos = todoService.getAllTodos();
      expect(todos).toEqual([]);
    });

    it('should return all todos after creating some', () => {
      const todo1 = todoService.createTodo({ title: 'Test 1', description: 'Description 1' });
      const todo2 = todoService.createTodo({ title: 'Test 2', description: 'Description 2' });
      
      const todos = todoService.getAllTodos();
      expect(todos).toHaveLength(2);
      expect(todos).toContainEqual(todo1);
      expect(todos).toContainEqual(todo2);
    });
  });

  describe('createTodo', () => {
    it('should create a new todo with correct properties', () => {
      const request: CreateTodoRequest = {
        title: 'New Todo',
        description: 'Todo description'
      };

      const todo = todoService.createTodo(request);

      expect(todo).toHaveProperty('id');
      expect(todo.title).toBe('New Todo');
      expect(todo.description).toBe('Todo description');
      expect(todo.completed).toBe(false);
      expect(todo.createdAt).toBeInstanceOf(Date);
    });

    it('should assign unique IDs to todos', () => {
      const todo1 = todoService.createTodo({ title: 'Todo 1', description: 'Desc 1' });
      const todo2 = todoService.createTodo({ title: 'Todo 2', description: 'Desc 2' });

      expect(todo1.id).not.toBe(todo2.id);
    });
  });

  describe('getTodoById', () => {
    it('should return undefined for non-existent todo', () => {
      const todo = todoService.getTodoById('999');
      expect(todo).toBeUndefined();
    });

    it('should return the correct todo by ID', () => {
      const created = todoService.createTodo({ title: 'Find Me', description: 'Description' });
      const found = todoService.getTodoById(created.id);

      expect(found).toEqual(created);
    });
  });

  describe('toggleTodo', () => {
    it('should return undefined for non-existent todo', () => {
      const todo = todoService.toggleTodo('999');
      expect(todo).toBeUndefined();
    });

    it('should toggle completed status from false to true', () => {
      const todo = todoService.createTodo({ title: 'Test', description: 'Test' });
      expect(todo.completed).toBe(false);

      const toggled = todoService.toggleTodo(todo.id);
      expect(toggled?.completed).toBe(true);
    });

    it('should toggle completed status from true to false', () => {
      const todo = todoService.createTodo({ title: 'Test', description: 'Test' });
      todoService.toggleTodo(todo.id); // Set to true
      const toggled = todoService.toggleTodo(todo.id); // Toggle back to false

      expect(toggled?.completed).toBe(false);
    });
  });

  describe('deleteTodo', () => {
    it('should return false for non-existent todo', () => {
      const deleted = todoService.deleteTodo('999');
      expect(deleted).toBe(false);
    });

    it('should delete the todo and return true', () => {
      const todo = todoService.createTodo({ title: 'Delete Me', description: 'Test' });
      const initialCount = todoService.getAllTodos().length;

      const deleted = todoService.deleteTodo(todo.id);
      expect(deleted).toBe(true);
      expect(todoService.getAllTodos()).toHaveLength(initialCount - 1);
      expect(todoService.getTodoById(todo.id)).toBeUndefined();
    });
  });
});
