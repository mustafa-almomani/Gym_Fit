import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'https://localhost:7072/api/Carts';

  constructor(private http: HttpClient) { }


  addToCart(userId: number, product: any): Observable<any> {
    const payload = { productId: product.id, quantity: product.quantity || 1 };
    console.log('Adding product to cart:', payload); 
    return this.http.post(`${this.apiUrl}/add/${userId}`, payload) 
      .pipe(
        catchError(this.handleError) 
      );
  }

  // Get all cart items from the backend
  //getCartItems(): Observable<any[]> {
  //  return this.http.get<any[]>(`${this.apiUrl}/items`)
  //    .pipe(
  //      catchError(this.handleError)
  //    );
  //}

  getCartItems(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getCartItemsByUserId/${id}`)
  }


  // Remove product from cart on the backend
  removeFromCart(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message); // Handle client-side errors
    } else {
      console.error(`Server-side error: ${error.status} - ${error.message}`); // Handle server-side errors
    }
    return throwError('Error processing cart request. Please try again later.');
  }




  deleteCartItem(id: any): Observable<any> {
    return this.http.delete<any>(`https://localhost:7072/api/Carts/cartitem/deleteitem/${id}`)
  }















}
