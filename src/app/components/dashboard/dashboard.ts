import { Component, inject, OnInit } from '@angular/core';
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
  
  totalProjects = 0;
  activeProjects = 0;
  delayedProjects = 0;

  ngOnInit() {
    this.projectService.getProjects().subscribe(data => {
      this.totalProjects = data.length;
      this.activeProjects = data.filter(p => p.status === 'Progreso').length;
      this.delayedProjects = data.filter(p => p.status === 'Atrasado').length;
    });
  }
}