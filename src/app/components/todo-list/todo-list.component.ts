// src/app/components/todo-list/todo-list.component.ts
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }

  delete(todo: Todo): void {
    if (todo.id) {
      this.todoService.deleteTodo(todo.id).subscribe(() => {
        this.todos = this.todos.filter(t => t !== todo);
        this.snackBar.open('To-Do deleted!', 'Close', { duration: 2000 });
      });
    }
  }

  toggleCompleted(todo: Todo): void {
    if (todo.id) {
      this.todoService.updateTodo(todo.id, { ...todo, completed: !todo.completed })
        .subscribe(updatedTodo => {
          const index = this.todos.findIndex(t => t.id === updatedTodo.id);
          if (index !== -1) {
            this.todos[index] = updatedTodo;
          }
        });
    }
  }
}
