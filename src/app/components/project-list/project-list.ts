import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Project } from '../../services/project';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  styleUrl: './project-list.css',
  templateUrl: './project-list.html',
})
export class ProjectList implements OnInit {
  projects: any[] = [];
  displayedColumns: string[] = ['name', 'client', 'status', 'progress'];

  searchTerm: string = '';
  selectedStatus: string = '';
  selectedPriority: string = '';

  private projectService = inject(Project);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    const filters = {
      search: this.searchTerm,
      status: this.selectedStatus,
      priority: this.selectedPriority,
    };

    this.projectService.getProjects(filters).subscribe({
      next: (data: any) => {
        this.projects = data.results ? data.results : data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error cargando proyectos:', err),
    });
  }

  changeStatus(project: any, newStatus: string) {
    this.projectService.updateProjectStatus(project.id, newStatus).subscribe({
      next: () => {
        project.status = newStatus;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error actualizando estado:', err),
    });
  }
}
