import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Project } from '../../services/project';

@Component({
  imports: [CommonModule, MatCardModule],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class DashboardComponent implements OnInit {
  private projectService = inject(Project);
  private cdr = inject(ChangeDetectorRef);

  totalProjects = 0;
  activeProjects = 0;
  delayedProjects = 0;

  ngOnInit() {
    this.projectService.getProjects().subscribe({
      next: (data: any[]) => {
        this.totalProjects = data.length;
        this.activeProjects = data.filter(p => p.status === 'Progreso').length;
        this.delayedProjects = data.filter(p => p.status === 'Atrasado').length;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando proyectos en el dashboard:', err);
      }
    });
  }
}
