import { Component, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { noWhitespaceValidator } from '../../../shared/validators/whitespace.validator';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent {
  submitted = output<string>();
  
  private fb = inject(FormBuilder);
  
  form = this.fb.group({
    text: ['', [Validators.required, noWhitespaceValidator(), Validators.minLength(2)]]
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const text = this.form.value.text || '';
    if (text.trim()) {
      this.submitted.emit(text.trim());
      this.form.reset();
    }
  }
}
