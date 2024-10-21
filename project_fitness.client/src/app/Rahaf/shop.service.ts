import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private baseUrl = 'https://localhost:7072/api';  // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Fetch all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Products`).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch products by category
  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Categories/${categoryId}/products`).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch all categories (add this method)
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Categories`).pipe(
      catchError(this.handleError)
    );
  }

  // Handle any errors during HTTP calls
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error(`Backend returned code ${error.status}, body was: ${error.message}`);
    return throwError('Something went wrong with the ShopService; please try again later.');
  }
}
