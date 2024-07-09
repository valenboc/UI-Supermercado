import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupermercadosService {
  private apiUrl = 'http://127.0.0.1:8000/api/supermercados/all';

  constructor(private http: HttpClient) {}

  getSupermercados(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.apiUrl, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  createSupermercado(supermercadoData: FormData): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    const createUrl = `http://127.0.0.1:8000/api/supermercado/new`;
  
    return this.http.post<any>(createUrl, supermercadoData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  
  editSupermercado(id: number, supermercadoData: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    const editUrl = `http://127.0.0.1:8000/api/supermercado/update/${id}`;
  
    console.log('Datos a enviar al servidor:', supermercadoData); 
  
    return this.http.put<any>(editUrl, supermercadoData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

deleteSupermercado(id: number): Observable<any> {
  const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  const deleteUrl = `http://127.0.0.1:8000/api/supermercado/delete/${id}`;

  return this.http.delete<any>(deleteUrl, { headers })
    .pipe(
      catchError(this.handleError)
    );
}

private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    console.error('Client-side error:', error.error.message);
  } else {
    console.error(`Server-side error: ${error.status}, ${JSON.stringify(error.error)}`);
  }
  return throwError('Server error. Please try again later.');
}

}
