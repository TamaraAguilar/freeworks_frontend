import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  selector: 'app-deliverable-form',
  styleUrl: './deliverable-form.css',
  templateUrl: './deliverable-form.html',
})
export class DeliverableFormComponent {
  private fb = inject(FormBuilder);
  
  deliverableForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    due_date: ['', Validators.required],
    simulated_file: ['']
  });

  onSubmit() {
    if (this.deliverableForm.valid) {
      this.deliverableForm.reset();
    }
  }
}