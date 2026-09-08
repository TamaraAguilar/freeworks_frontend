import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ProjectList } from './components/project-list/project-list';
import { DeliverableFormComponent } from './components/deliverable-form/deliverable-form';


export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'projects', component: ProjectList },
  { path: 'deliverables/new', component: DeliverableFormComponent }
];