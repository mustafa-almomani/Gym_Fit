import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl = 'https://localhost:7072/api';

  constructor(private http: HttpClient) { }

  // Fetch all categories
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Categories`).pipe(
      catchError(this.handleError)
    );
  }

  // Error handler
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    return throwError('Something went wrong with the category service; please try again later.');
  }
}
