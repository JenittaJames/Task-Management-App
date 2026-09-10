import { Component, input, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentStore } from '../../../core/services/comment.store';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommentItemComponent } from '../comment-item/comment-item.component';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule, CommentFormComponent, CommentItemComponent],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentListComponent {
  taskId = input.required<string>();
  
  store = inject(CommentStore);
  
  get comments() {
    return this.store.getByTaskId(this.taskId());
  }

  onRootComment(text: string) {
    this.store.addComment(this.taskId(), text);
  }
}
