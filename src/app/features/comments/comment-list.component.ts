import { Component, input, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentStore } from '../../core/services/comment.store';
import { CommentFormComponent } from './comment-form.component';
import { CommentItemComponent } from './comment-item.component';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule, CommentFormComponent, CommentItemComponent],
  template: `
    <div class="comment-list">
      <app-comment-form (submitted)="onRootComment($event)"></app-comment-form>
      
      <div class="comments">
        @for (comment of comments(); track comment.id) {
          <app-comment-item [comment]="comment" [taskId]="taskId()"></app-comment-item>
        } @empty {
          <p class="empty-msg">No comments yet. Be the first!</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .comments { margin-top: 20px; }
    .empty-msg { color: #6c757d; font-style: italic; margin-top: 15px; }
  `],
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
