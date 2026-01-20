import { Todo, CreateTodoRequest } from '../models/todo';

// In-memory storage for simplicity
const todos: Todo[] = [];
let nextId = 1;

export class TodoService {
  /**
   * Get all todos
   */
  getAllTodos(): Todo[] {
    return todos;
  }

  /**
   * Get a todo by ID
   */
  getTodoById(id: string): Todo | undefined {
    return todos.find(todo => todo.id === id);
  }

  /**
   * Create a new todo
   */
  createTodo(request: CreateTodoRequest): Todo {
    const newTodo: Todo = {
      id: nextId.toString(),
      title: request.title,
      description: request.description,
      completed: false,
      createdAt: new Date()
    };
    nextId++;
    todos.push(newTodo);
    return newTodo;
  }

  /**
   * Toggle todo completion status
   */
  toggleTodo(id: string): Todo | undefined {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
    return todo;
  }

  /**
   * Delete a todo
   */
  deleteTodo(id: string): boolean {
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
      return true;
    }
    return false;
  }
}
