import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // <-- Import tap here
import { Todo } from '../models/todo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private springBootUrl = environment.springBootUrl;
  private apiUrl = this.springBootUrl; // Update with your actual API URL
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTodos();
  }

  private loadTodos(): void {
    this.http.get<Todo[]>(this.apiUrl).subscribe(todos => {
      this.todosSubject.next(todos);
    });
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo).pipe(
      tap(() => this.loadTodos())
    );
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo).pipe(
      tap(() => this.loadTodos())
    );
  }

  deleteTodo(todoId: number): Observable<void> {
    const url = `${this.apiUrl}/${todoId}`;
    return this.http.delete<void>(url).pipe(
      tap(() => this.loadTodos())
    );
  }
}
