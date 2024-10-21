import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentApiUrl = 'https://localhost:7072/api/Payments';

  constructor(private http: HttpClient) { }

  processPayment(paymentDetails: any): Observable<any> {
    return this.http.post(`${this.paymentApiUrl}/payment`, paymentDetails);
  }
}
