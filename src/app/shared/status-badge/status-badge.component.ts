import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStatus } from '../../core/models/task.model';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss']
})
export class StatusBadgeComponent {
  status = input.required<TaskStatus>();

  badgeClass() {
    return {
      'pending': this.status() === 'Pending',
      'in-progress': this.status() === 'In Progress',
      'completed': this.status() === 'Completed'
    };
  }
}
