import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Project } from '../../services/project';

@Component({
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule
  ],
  selector: 'app-project-create',
  styleUrl: './project-create.css',
  templateUrl: './project-create.html',
})
export class ProjectCreate{
  private fb = inject(FormBuilder);
  private projectService = inject(Project);
  private router = inject(Router);

  projectForm = this.fb.group({
    name: ['', Validators.required],
    client: ['', Validators.required],
    status: ['Progreso', Validators.required],
    priority: ['Media', Validators.required]
  });

  onSubmit() {
    if (this.projectForm.valid) {
      this.projectService.createProject(this.projectForm.value).subscribe({
        next: (response) => {
          console.log('Proyecto creado con éxito:', response);
          this.router.navigate(['/projects']);
        },
        error: (err) => {
          console.error('Error al crear el proyecto:', err);
        }
      });
    }
  }
}