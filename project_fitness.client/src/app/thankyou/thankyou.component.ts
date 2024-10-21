import { Component, OnInit } from '@angular/core';
import { URLService, ExecutePaymentRequestDto } from '../url/url.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})

export class ThankyouComponent implements OnInit {

  constructor(private _ser: URLService, private router: Router, private URLService: URLService) { }
  userId: any;
  month: any;
  amount: any;
  gymid: any;
  classid:any
  ngOnInit(): void {
    const userId = localStorage.getItem('UserId');
    if (userId) {
      this._ser.userId.next(userId);
    }    this.URLService.UserIdmm.subscribe(user => {
      this.userId = user
      console.log('user ID from Cart:', this.userId);
    });
    const email = localStorage.getItem('Email')
    if (email) {
      this._ser['userEmail'].next(email);
    }
    this.URLService.month.subscribe(month => {
      this.month = month
      console.log('sub month = ',this.month)
    })
    this.URLService.totalforsub.subscribe(totall => {
      this.amount = totall;
      console.log('the amount', this.amount);
    })
    this.URLService.GymID.subscribe(sub => {
      this.gymid = sub;
      console.log('gym id ', this.gymid);
    })
    this.executePayment();
  }

  executePayment(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('paymentId');
    const payerId = urlParams.get('PayerID');

   
    if (paymentId && payerId) {
      const executePaymentRequest: ExecutePaymentRequestDto = {
        PaymentId: paymentId,
        PayerId: payerId,
        UserId: Number( localStorage.getItem('UserId')),
        GymId: localStorage.getItem('GymId') ? Number(localStorage.getItem('GymId')) : null,
        FitnessClassId: localStorage.getItem('ClassID') ? Number(localStorage.getItem('ClassID')) : null,
        StartDate: new Date(),
        EndDate: new Date(new Date().setMonth(new Date().getMonth() + Number(localStorage.getItem('moth')))),  
        Total: Number(localStorage.getItem('price')) 
      };

      
      this._ser.executePayment(executePaymentRequest).subscribe(
        (response: any) => {
          console.log('Payment executed successfully:', response);

          localStorage.removeItem('GymId');
          localStorage.removeItem('ClassID')
        },
        (error: any) => {
          console.error('Error executing payment:', error);
          localStorage.removeItem('GymId');
          localStorage.removeItem('ClassID')
        }
      );
    } else {
      console.error('No paymentId or PayerID found in the URL.');
    }
  }
}
