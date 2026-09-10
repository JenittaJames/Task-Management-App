import { Component, inject, ChangeDetectionStrategy, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaskStore } from '../../../core/services/task.store';
import { StatusBadgeComponent } from '../../../shared/status-badge/status-badge.component';
import { CommentListComponent } from '../../comments/comment-list.component';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusBadgeComponent, CommentListComponent],
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TaskDetailsComponent {
  id = input.required<string>(); // from route
  
  store = inject(TaskStore);
  
  get task() {
    return this.store.getById(this.id())();
  }
}
