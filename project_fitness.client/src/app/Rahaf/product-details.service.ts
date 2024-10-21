import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLService } from '../url/url.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {
  logedINuser = '';
  staticData = 'https://localhost:7072/api';

  constructor(private http: HttpClient, private URLService: URLService) { }

  getProductDetails(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Products/${id}`);
  }

  cartItem: any[] = [];
  cartItemSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.cartItem);
  cartItemObser = this.cartItemSubject.asObservable();

  apiPost: any = {
    productId: 0,
    quantity: 0,
    price: 0,
    cartId: 0,
    email: 'string'
  };

  addToCart(data: any) {
    

    this.URLService.userEmail.subscribe(email => {
      this.logedINuser = email;
      console.log('Email from another service:', email);
    });

    if (this.logedINuser === '') {
      const recode = this.cartItem.find((x: any) => x.productId === data.productId);
      if (recode) {
        recode.quantity += data.quantity;
        this.cartItemSubject.next(this.cartItem);
        //observer.next(this.cartItem); // Emit the updated cart data
      } else {
        this.cartItem.push(data);
        this.cartItemSubject.next(this.cartItem);
        // observer.next(this.cartItem); // Emit the updated cart data
      }
      // observer.complete(); // Mark the Observable as complete
    } else {
      this.apiPost.productId = data.productId;
      this.apiPost.quantity = data.quantity;
      this.apiPost.price = data.price;
      this.apiPost.cartId = data.cartId;
      this.apiPost.email = this.logedINuser;

      this.addcartItemToDatabase(this.apiPost).subscribe(

      );

    };
  }


  addcartItemToDatabase(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/CartItems/addcartitem`, data);
  }

  addLocalToUser(email: string) {
    for (let i = 0; i < this.cartItem.length; i++) {
      let apiPost = {
        productId: this.cartItem[i].productId,
        quantity: this.cartItem[i].quantity,
        price: this.cartItem[i].price,
        cartId: this.cartItem[i].cartId,
        email: email
      };

      this.addcartItemToDatabase(apiPost).subscribe(
        data => {
          console.log('Successfully added:', data);
          this.cartItem.splice(i, 1); // Remove item after successful API call
        },
        error => {
          console.error('Error adding cart item:', error);
        }
      );
    }
  }

  // Other methods remain the same...
  increaseQ(id: any) {
    const product = this.cartItem.find((x: any) => x.productId === id);
    if (product) {
      product.quantity += 1;
      this.cartItemSubject.next(this.cartItem);
    }
  }

  decreaseQ(id: any) {
    const product = this.cartItem.find((x: any) => x.productId === id);
    const productIndex = this.cartItem.findIndex((x: any) => x.productId === id);
    if (product) {
      product.quantity -= 1;

      if (product.quantity <= 0) {
        this.cartItem.splice(productIndex, 1);
        this.cartItemSubject.next(this.cartItem);
      } else {
        this.cartItemSubject.next(this.cartItem);
      }
      
    }
  }

  deleteItem(id: any) {
    const productIndex = this.cartItem.findIndex((x: any) => x.productId === id);
    if (productIndex !== -1) {
      this.cartItem.splice(productIndex, 1);
      this.cartItemSubject.next(this.cartItem);
    }
  }

  APIincreaseQ(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/CartItems/increaseQuantity/${id}`);
  }

  APIdecreaseQ(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/CartItems/decreaseQuantity/${id}`);
  }

  getUSER(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Users/${id}`);
  }

  paypalCheckout(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/paymentTEST/checkout/${id}`);
  }

  cashCheckout(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/paymentTEST/createOrder/${id}`);
  }
}
