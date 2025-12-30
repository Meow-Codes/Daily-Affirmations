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

export interface OnePieceResponse {
  text: string;
  author: string;
  character?: string;  
}

@Injectable({
  providedIn: 'root'
})
export class AffirmationService {
  private baseUrl = 'https://daily-affirmations-ithm.onrender.com/api';

  constructor(private http: HttpClient) {}

  getDaily(isOnePiece: boolean = false): Observable<any> {
    const affEndpoint = isOnePiece ? '/onepiece' : '/affirmation';
    const bgEndpoint = isOnePiece ? '/onepiece/background' : '/background';

    const aff = this.http.get(isOnePiece ? `${this.baseUrl}${affEndpoint}` : `${this.baseUrl}${affEndpoint}`);
    const bg = this.http.get<Background>(`${this.baseUrl}${bgEndpoint}`);

    return forkJoin({ affirmation: aff, background: bg });
  }
}