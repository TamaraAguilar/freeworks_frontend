import { inject, Service } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class Project {
  private apiUrl = 'http://localhost:8000/api/projects/';
  private commentUrl = 'http://localhost:8000/api/comments/';

  private http = inject(HttpClient);

  getProjects(filters?: {
    search?: string;
    client?: string;
    status?: string;
    priority?: string;
  }): Observable<any[]> {
    let params = new HttpParams();
    if (filters?.search) params = params.set('search', filters.search);
    if (filters?.client) params = params.set('client', filters.client);
    if (filters?.status) params = params.set('status', filters.status);
    if (filters?.priority) params = params.set('priority', filters.priority);

    return this.http.get<any[]>(this.apiUrl, { params });
  }

  createProject(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  updateProjectStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}${id}/`, { status });
  }

  addComment(projectId: number, text: string): Observable<any> {
    return this.http.post<any>(this.commentUrl, { project: projectId, text });
  }
}
