import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="comment-form">
      <textarea [(ngModel)]="text" placeholder="Write a comment..." rows="3"></textarea>
      <button (click)="submit()" [disabled]="!text.trim()" class="btn btn-sm btn-primary">Submit</button>
    </div>
  `,
  styles: [`
    .comment-form { display: flex; flex-direction: column; gap: 8px; margin-top: 10px; }
    textarea { width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
    button { align-self: flex-start; }
  `]
})
export class CommentFormComponent {
  submitted = output<string>();
  text = '';

  submit() {
    if (this.text.trim()) {
      this.submitted.emit(this.text);
      this.text = '';
    }
  }
}
