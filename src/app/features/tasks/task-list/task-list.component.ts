import { Component, inject, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaskStore } from '../../../core/services/task.store';
import { StatusBadgeComponent } from '../../../shared/status-badge/status-badge.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusBadgeComponent],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {
  store = inject(TaskStore);
  
  searchQuery = signal('');
  sortOption = signal('latest');
  currentPage = signal(1);
  pageSize = signal(5);
  taskToDelete = signal<string | null>(null);

  filteredTasks = computed(() => {
    let tasksWithIndex = this.store.tasks().map((task, index) => ({ task, index }));
    
    let filtered = tasksWithIndex.filter(item => 
      item.task.title.toLowerCase().includes(this.searchQuery().toLowerCase())
    );

    filtered.sort((a, b) => {
      const dateA = new Date(a.task.deadline).getTime();
      const dateB = new Date(b.task.deadline).getTime();
      
      switch (this.sortOption()) {
        case 'latest': return b.index - a.index;
        case 'oldest': return a.index - b.index;
        case 'deadline_newest': return dateB - dateA;
        case 'deadline_oldest': return dateA - dateB;
        case 'az': return a.task.title.localeCompare(b.task.title);
        case 'za': return b.task.title.localeCompare(a.task.title);
        default: return 0;
      }
    });

    return filtered.map(item => item.task);
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filteredTasks().length / this.pageSize())));

  paginatedTasks = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredTasks().slice(start, start + this.pageSize());
  });

  updateSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
    this.currentPage.set(1);
  }

  updateSort(event: Event) {
    this.sortOption.set((event.target as HTMLSelectElement).value);
    this.currentPage.set(1);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  confirmDelete(id: string) {
    this.taskToDelete.set(id);
  }

  cancelDelete() {
    this.taskToDelete.set(null);
  }

  executeDelete() {
    const id = this.taskToDelete();
    if (id) {
      this.store.delete(id);
      this.taskToDelete.set(null);
      if (this.paginatedTasks().length === 0 && this.currentPage() > 1) {
        this.currentPage.update(p => p - 1);
      }
    }
  }
}
