import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define the Category interface
interface Category {
  id?: number;
  categoryName: string;
  description: string;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'https://localhost:7072/api/Categories';  // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  // Get all categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  // Get a category by ID
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }


  // Add a new category using FormData for file uploads
  addCategory(formData: FormData): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, formData).pipe(catchError(this.handleError));
  }


  // Update an existing category by ID
  updateCategory(id: number, category: any): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${id}`, category)
      .pipe(catchError(this.handleError));
  }

  getCategory(id: any) {
    return this.http.get<any>(`${this.baseUrl}/getCategoryById/${id}`)
  }

  // Delete a category by ID
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}

