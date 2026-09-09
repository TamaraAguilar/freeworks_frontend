import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Project } from '../../services/project';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  selector: 'app-comment-modal',
  styleUrl: './comment-modal.css',
  templateUrl: './comment-modal.html',
})
export class CommentModal implements OnInit {
  readonly data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<CommentModal>);
  private projectService = inject(Project);
  private fb = inject(FormBuilder);

  project = this.data.project;
  comments: any[] = [];

  commentForm = this.fb.group({
    text: ['', Validators.required],
  });

  ngOnInit() {
    this.comments = this.project.comments || [];
  }

  addComment() {
    if (this.commentForm.valid) {
      const text = this.commentForm.value.text!;
      this.projectService.addComment(this.project.id, text).subscribe({
        next: (newComment) => {
          this.comments.push(newComment);
          this.commentForm.reset();
        },
        error: (err) => console.error('Error al guardar comentario:', err),
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
