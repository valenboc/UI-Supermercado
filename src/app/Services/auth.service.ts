import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlLogin = 'http://127.0.0.1:8000/api/auth/user/login';
  private apiUrlRegister = 'http://127.0.0.1:8000/api/auth/user/register';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post<any>(`${this.apiUrlLogin}`, { email, password }, { headers })
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
          }
        }),
        catchError(this.handleError)
      );
  }

  register(name: string, email: string, password: string, passwordConfirmation: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post<any>(this.apiUrlRegister, { name, email, password, password_confirmation: passwordConfirmation }, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Error del lado del cliente:', error.error.message);
    } else {
      console.error(`Código de error ${error.status}, ${error.error}`);
    }
    return throwError('Error en el servidor, por favor intenta nuevamente más tarde.');
  }
}
