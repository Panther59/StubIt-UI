import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Stub {
  id?: string;
  name: string;
  request: {
    method: string;
    path: string;
    headers?: Record<string, string>;
    bodyPattern?: string;
  };
  response: {
    statusCode: number;
    headers?: Record<string, string>;
    body?: string;
    latency?: number;
  };
  isEnabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StubService {
  private http = inject(HttpClient);
  private apiUrl = '/api/stubs';

  getStubs(): Observable<Stub[]> {
    return this.http.get<Stub[]>(this.apiUrl);
  }

  getStub(id: string): Observable<Stub> {
    return this.http.get<Stub>(`${this.apiUrl}/${id}`);
  }

  createStub(stub: Stub): Observable<Stub> {
    return this.http.post<Stub>(this.apiUrl, stub);
  }

  updateStub(id: string, stub: Stub): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, stub);
  }

  deleteStub(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
