import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLService, CreatePaymentRequestDto, ExecutePaymentRequestDto } from '../../url/url.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gym-details',
  templateUrl: './gym-details.component.html',
  styleUrls: ['./gym-details.component.css']
})
export class GymDetailsComponent implements OnInit {

  parameter: any;
  DetailsArray: any;
  userId: any
  amount: any
  gymid:any

  constructor(private _ser: URLService, private _route: ActivatedRoute, private URLService: URLService) { }

  ngOnInit() {
    this.parameter = this._route.snapshot.paramMap.get("id");
    this.URLService.UserIdmm.subscribe(user => {
      this.userId = user
      console.log('user ID from Cart:', this.userId);
    });
    this.userId = localStorage.getItem('UserId')
    this.getDetails(this.parameter);
    this.checkForPaymentExecution();
  }


  getDetails(id: any) {
    this._ser.getGymDetails(id).subscribe((data: any) => {
      this.DetailsArray = data;
      console.log(this.DetailsArray, 'details');
    });

  }

  addsubscribtion(price: number, months: number, gymId: number):  void {
    
    if (this.userId == null || this.userId == 0 || this.userId == undefined) {

      Swal.fire({
        icon: "info",
        title: "You must be logged in!",
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        
        window.location.href = '/Login'; 
      });
    }
    this._ser.month.next(months);
    localStorage.setItem('moth', months.toString())
    this._ser.GymId.next(gymId);
    localStorage.setItem('GymId', gymId.toString())
    this._ser.total.next(price);
    localStorage.setItem('price', price.toString())

    console.log('Current months value:', months);
    console.log('Current gymId value:', gymId);
    console.log('Current price value:', price);
    const request: CreatePaymentRequestDto = {
      redirectUrl: window.location.origin,  
      total: price,  
      message: `Subscription for ${months} months`,
      userId: Number(this.userId)  
    };

    this._ser.createPayment(request).subscribe(
      (response: any) => {
        
        if (response && response.approvalUrl) {
          console.log(response.approvalUrl)
          window.location.href = response.approvalUrl;  
        } else {
          console.error('Payment could not be created.');
        }
      },
      (error: any) => {
        console.error('Error creating payment:', error);
      }
    );
  }
  checkForPaymentExecution(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('paymentId');
    const payerId = urlParams.get('PayerID');
   
    if (paymentId && payerId) {
      const executePaymentRequest: ExecutePaymentRequestDto = {
        PaymentId: paymentId,
        PayerId: payerId,
        UserId: 1,  
        GymId: this.DetailsArray?.gymId || null,  
        FitnessClassId: null,  
        StartDate: new Date(),
        EndDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),  
        Total: this.DetailsArray?.price || 0  
      };

      this._ser.executePayment(executePaymentRequest).subscribe(
        (response: any) => {
          console.log('Payment executed and subscription created successfully:', response);
        },
        (error: any) => {
          console.error('Error executing payment:', error);
        }
      );
    }
  }
}
