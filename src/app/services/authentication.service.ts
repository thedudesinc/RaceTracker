import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginInput, LoginOutput } from './models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = environment.baseUrl + '/users/login';
  setAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(this.initAuthentication());
  isAuthenticated$: Observable<boolean> = this.setAuthenticated.asObservable();

  constructor(private http: HttpClient) { }

  initAuthentication(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  login(login: LoginInput): Observable<boolean> {
    return this.http.post<LoginOutput>(this.baseUrl, login).pipe(
      map((response) => {
        if (response.statusCode !== 200 || !response.token) return false;

        localStorage.setItem('token', response.token);
        this.setAuthenticated.next(true);
        return true;
      })
    );
  }
}
