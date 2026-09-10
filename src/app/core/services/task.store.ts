import { Injectable, signal, computed, inject } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskApiService } from './task-api.service';

@Injectable({ providedIn: 'root' })
export class TaskStore {
  private readonly _tasks = signal<Task[]>([]);
  readonly tasks = this._tasks.asReadonly();

  readonly pendingCount = computed(() =>
    this._tasks().filter(t => t.status === 'Pending').length);

  private api = inject(TaskApiService);

  constructor() {
    this.api.getTasks().subscribe(data => this._tasks.set(data));
  }

  getById(id: string) {
    return computed(() => this._tasks().find(t => t.id === id));
  }

  add(task: Task) {
    this._tasks.update(list => [...list, task]);
  }

  update(updated: Task) {
    this._tasks.update(list =>
      list.map(t => t.id === updated.id ? updated : t));
  }

  delete(id: string) {
    this._tasks.update(list => list.filter(t => t.id !== id));
  }
}
