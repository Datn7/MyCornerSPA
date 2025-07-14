import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:5001/api/auth';
  private tokenKey = 'mycorner_token';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  register(data: {
    email: string;
    password: string;
    displayName: string;
  }): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/register`, data)
      .pipe(tap((res) => this.setToken(res.token)));
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http
      .post<{ token: string }>(`${this.baseUrl}/login`, data)
      .pipe(tap((res) => this.setToken(res.token)));
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.isLoggedInSubject.next(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
