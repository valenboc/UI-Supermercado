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
  private apiUrlLogout = 'http://127.0.0.1:8000/api/auth/user/logout';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post<any>(this.apiUrlLogin, { email, password }, { headers }).pipe(
      tap(response => {
        if (response.access_token) {
          localStorage.removeItem('authToken'); // Limpiar token anterior si existe
          localStorage.setItem('authToken', response.access_token); // Guardar nuevo token
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

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.post<any>(this.apiUrlLogout, {}, { headers }).pipe(
      tap(() => {
        localStorage.removeItem('authToken'); // Limpiar el token al salir
      }),
      catchError(this.handleError)
    );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
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
