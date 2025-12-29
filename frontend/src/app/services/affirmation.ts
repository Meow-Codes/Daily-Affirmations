import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

export interface Affirmation {
  text: string;
  author: string;
}

export interface Background {
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class AffirmationService {
  private apiUrl = 'http://localhost:6942/api';  // Your Go backend port

  constructor(private http: HttpClient) {}

  getDaily(): Observable<{ affirmation: Affirmation; background: Background }> {
    const aff = this.http.get<Affirmation>(`${this.apiUrl}/affirmation`);
    const bg = this.http.get<Background>(`${this.apiUrl}/background`);
    return forkJoin({ affirmation: aff, background: bg });
  }
}