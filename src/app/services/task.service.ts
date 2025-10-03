import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pipe } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url: string = "https://app-tasks-api.onrender.com";

  constructor(private http: HttpClient) { }

  findAllTasks(): Observable<Task[]> {
    return this.http.get(this.url).pipe(
      map(task => (
        task as Task[]
      ))
    )
  }

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.url, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.url}/${task.id}`, task);
  }

  removeTask(id: number): Observable<Task> {
    return this.http.delete<Task>(`${this.url}/${id}`);
  }
}
