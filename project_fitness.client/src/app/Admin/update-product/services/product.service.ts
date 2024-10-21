import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Product {
  id?: number;
  categoryId: number;
  productName: string;
  description: string;
  price: number;
  stockQuantity: number;
  image: string;  // URL of the image, not a file object
  discount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://localhost:7072/api';

  constructor(private http: HttpClient) { }

  // Add a new product with FormData for handling images
  addProduct(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/Products`, formData)
      .pipe(catchError(this.handleError));
  }

  // Update an existing product by ID with FormData
  updateProduct(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/Products/updateproduct/${id}`, formData)
      .pipe(catchError(this.handleError));
  }

  // Fetch a single product by ID
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/Products/${id}`)
      .pipe(catchError(this.handleError));
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/Products`)
      .pipe(catchError(this.handleError));
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Products/${id}`)
      .pipe(
        catchError(this.handleError) 
      );
  }
  getCategories(): Observable<any[]> {
    const categoryUrl = 'https://localhost:7072/api/Categories'; 
    return this.http.get<any[]>(categoryUrl);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
