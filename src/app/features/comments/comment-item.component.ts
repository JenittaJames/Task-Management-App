import { Component, input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../core/models/comment.model';
import { CommentFormComponent } from './comment-form.component';
import { CommentStore } from '../../core/services/comment.store';

@Component({
  selector: 'app-comment-item',
  standalone: true,
  imports: [CommonModule, CommentFormComponent],
  template: `
    <div class="comment-item">
      <div class="comment-content">
        <p class="text">{{ comment().text }}</p>
        <span class="date">{{ comment().createdAt | date:'short' }}</span>
        <button class="btn-link" (click)="replying.set(!replying())">Reply</button>
      </div>

      @if (replying()) {
        <app-comment-form (submitted)="onReply($event)"></app-comment-form>
      }

      <div class="replies">
        @for (reply of comment().replies; track reply.id) {
          <app-comment-item [comment]="reply" [taskId]="taskId()"></app-comment-item>
        }
      </div>
    </div>
  `,
  styles: [`
    .comment-item { margin-top: 10px; }
    .comment-content { background: #f8f9fa; padding: 10px; border-radius: 4px; border-left: 3px solid #007bff; }
    .text { margin: 0 0 5px 0; }
    .date { font-size: 0.8rem; color: #6c757d; margin-right: 10px; }
    .btn-link { background: none; border: none; color: #007bff; cursor: pointer; padding: 0; font-size: 0.85rem; }
    .replies { margin-left: 20px; padding-left: 10px; border-left: 1px dashed #ccc; }
  `]
})
export class CommentItemComponent {
  comment = input.required<Comment>();
  taskId = input.required<string>();
  
  replying = signal(false);
  store = inject(CommentStore);

  onReply(text: string) {
    this.store.addReply(this.comment().id, text);
    this.replying.set(false);
  }
}
