import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStatus } from '../../core/models/task.model';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [ngClass]="badgeClass()">
      {{ status() }}
    </span>
  `,
  styles: [`
    .badge { padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: bold; }
    .pending { background: #ffeeba; color: #856404; }
    .in-progress { background: #b8daff; color: #004085; }
    .completed { background: #c3e6cb; color: #155724; }
  `]
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
