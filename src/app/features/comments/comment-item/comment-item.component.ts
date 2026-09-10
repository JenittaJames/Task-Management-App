import { Component, input, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../../core/models/comment.model';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommentStore } from '../../../core/services/comment.store';

@Component({
  selector: 'app-comment-item',
  standalone: true,
  imports: [CommonModule, CommentFormComponent],
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
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
