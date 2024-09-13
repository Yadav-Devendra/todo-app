import { Component } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  todo: Todo = { title: '', completed: false };

  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar
  ) {}

  addTodo(): void {
    if (this.todo.title.trim()) {
      this.todoService.addTodo(this.todo).subscribe(() => {
        this.todo = { title: '', completed: false };  // Clear the form
        this.snackBar.open('To-Do added!', 'Close', { duration: 2000 });
      });
    }
  }
}
