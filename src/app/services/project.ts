import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class Project {
  private apiUrl = 'http://localhost:8000/api/projects/';
  
  private http = inject(HttpClient);

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateProjectStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}${id}/`, { status });
  }
}
