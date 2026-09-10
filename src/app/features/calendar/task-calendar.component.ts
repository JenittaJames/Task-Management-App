import { Component, inject, ChangeDetectionStrategy, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CalendarModule, CalendarEvent } from 'angular-calendar';
import { TaskStore } from '../../core/services/task.store';

@Component({
  selector: 'app-task-calendar',
  standalone: true,
  imports: [CommonModule, CalendarModule],
  templateUrl: './task-calendar.component.html',
  styleUrls: ['./task-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TaskCalendarComponent {
  viewDate: Date = new Date();
  
  store = inject(TaskStore);
  router = inject(Router);

  get events(): CalendarEvent[] {
    return this.store.tasks().map(task => {
      let color: any;
      if (task.status === 'Completed') color = { primary: '#28a745', secondary: '#c3e6cb' };
      else if (task.status === 'In Progress') color = { primary: '#007bff', secondary: '#b8daff' };
      else color = { primary: '#ffc107', secondary: '#ffeeba' };

      return {
        start: new Date(task.deadline),
        title: task.title,
        color,
        meta: { id: task.id }
      };
    });
  }

  eventClicked(event: any): void {
    if (event.event.meta?.id) {
      this.router.navigate(['/tasks', event.event.meta.id]);
    }
  }
}
