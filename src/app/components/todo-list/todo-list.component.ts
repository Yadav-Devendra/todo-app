import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  selectedTodo: Todo | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.todos$.subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todoId: number): void {
    this.todoService.deleteTodo(todoId).subscribe();
  }

  toggleTodoCompletion(todo: Todo): void {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe();
  }

  editTodo(todo: Todo): void {
    this.selectedTodo = { ...todo }; // Clone the todo for editing
  }

  updateTodo(): void {
    if (this.selectedTodo) {
      this.todoService.updateTodo(this.selectedTodo).subscribe(() => {
        this.selectedTodo = null; // Clear selected todo after update
      });
    }
  }
}
