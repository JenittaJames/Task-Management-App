import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskApiService {
  private http = inject(HttpClient);

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/assets/tasks.json');
  }
}
