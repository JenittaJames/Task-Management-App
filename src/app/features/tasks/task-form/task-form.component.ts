import { Component, inject, OnInit, ChangeDetectionStrategy, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { TaskStore } from '../../../core/services/task.store';
import { Task, TaskStatus } from '../../../core/models/task.model';
import { deadlineNotPast } from '../../../shared/validators/deadline.validator';
import { noWhitespaceValidator, htmlMinLengthValidator } from '../../../shared/validators/whitespace.validator';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuillModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TaskFormComponent implements OnInit {
  id = input<string>(); // from route param

  fb = inject(FormBuilder);
  store = inject(TaskStore);
  router = inject(Router);

  isEditMode = false;
  statuses: TaskStatus[] = ['Pending', 'In Progress', 'Completed'];
  todayDate = new Date().toISOString().substring(0, 10);

  form = this.fb.group({
    title: ['', [Validators.required, noWhitespaceValidator(), Validators.minLength(3), Validators.maxLength(100)]],
    description: ['', [Validators.required, noWhitespaceValidator(), htmlMinLengthValidator(10)]],
    deadline: ['', [Validators.required, deadlineNotPast()]],
    status: ['Pending' as TaskStatus, Validators.required]
  });

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'bullet' }]
    ]
  };

  ngOnInit() {
    const taskId = this.id();
    if (taskId && taskId !== 'new') {
      this.isEditMode = true;
      const task = this.store.getById(taskId)();
      if (task) {
        this.form.patchValue({
          title: task.title,
          description: task.description,
          deadline: task.deadline.substring(0, 10), // for date input
          status: task.status
        });
      }
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const val = this.form.value;
    const taskData: Task = {
      id: this.isEditMode ? this.id()! : crypto.randomUUID(),
      title: val.title!,
      description: val.description!,
      deadline: val.deadline!,
      status: val.status as TaskStatus
    };

    if (this.isEditMode) {
      this.store.update(taskData);
    } else {
      this.store.add(taskData);
    }

    this.router.navigate(['/tasks']);
  }
}
