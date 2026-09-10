import { Injectable, signal, computed } from '@angular/core';
import { Comment } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentStore {
  private readonly _comments = signal<Comment[]>([]);
  readonly comments = this._comments.asReadonly();

  getByTaskId(taskId: string) {
    return computed(() => this._comments().filter(c => c.taskId === taskId));
  }

  addComment(taskId: string, text: string) {
    const newComment: Comment = {
      id: crypto.randomUUID(),
      taskId,
      text,
      createdAt: new Date().toISOString(),
      replies: []
    };
    this._comments.update(list => [...list, newComment]);
  }

  addReply(parentId: string, text: string) {
    const addReplyRecursive = (comments: Comment[], parentId: string, reply: Comment): Comment[] => {
      return comments.map(c => {
        if (c.id === parentId) {
          return { ...c, replies: [...c.replies, reply] };
        } else if (c.replies.length > 0) {
          return { ...c, replies: addReplyRecursive(c.replies, parentId, reply) };
        }
        return c;
      });
    };

    const newReply: Comment = {
      id: crypto.randomUUID(),
      taskId: '',
      text,
      createdAt: new Date().toISOString(),
      replies: []
    };

    this._comments.update(list => addReplyRecursive(list, parentId, newReply));
  }
}
