import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { 
    path: 'tasks', 
    loadComponent: () => import('./features/tasks/task-list/task-list.component').then(m => m.TaskListComponent) 
  },
  { 
    path: 'tasks/new', 
    loadComponent: () => import('./features/tasks/task-form/task-form.component').then(m => m.TaskFormComponent) 
  },
  { 
    path: 'tasks/:id', 
    loadComponent: () => import('./features/tasks/task-details/task-details.component').then(m => m.TaskDetailsComponent) 
  },
  { 
    path: 'tasks/:id/edit', 
    loadComponent: () => import('./features/tasks/task-form/task-form.component').then(m => m.TaskFormComponent) 
  }
];
