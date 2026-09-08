import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Project } from '../../services/project';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressBarModule],
  styleUrl: './project-list.css',
  templateUrl: './project-list.html',
})
export class ProjectList implements OnInit {
  projects: any[] = [];
  displayedColumns: string[] = ['name', 'client', 'status', 'progress'];
  
  private projectService = inject(Project);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
   this.projectService.getProjects().subscribe({
    next: (data: any[]) => {
      this.projects = data;
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Error cargando la lista:', err);
    }
  });
  }
}