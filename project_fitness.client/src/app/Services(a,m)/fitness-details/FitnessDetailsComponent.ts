import { Component } from '@angular/core';
import { CreatePaymentRequestDto, URLService } from '../../url/url.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fitness-details',
  templateUrl: './fitness-details.component.html',
  styleUrl: './fitness-details.component.css'
})
export class FitnessDetailsComponent {

  parameter: any
  Details: any
  userId: any

  ngOnInit() {
    
    this.parameter = this._route.snapshot.paramMap.get("id")
   
    this.URLService.UserIdmm.subscribe(user => {
      this.userId = user
      console.log('user ID from Cart:', this.userId);
    });
    this.userId = localStorage.getItem('UserId')
    this.getDetails(this.parameter)
  }
  constructor(private _ser: URLService, private _route: ActivatedRoute, private URLService: URLService) { }

  getDetails(id: any) {
    
    this._ser.getClassDetails(id).subscribe((data: any) => {
      this.Details = data;
      console.log(this.Details, 'details')
    }
    )
  }
  addsubscribtion(price: number, months: number, ClassID: number): void {
    
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
    localStorage.setItem('ClassID', ClassID.toString())
    this._ser.total.next(price);
    localStorage.setItem('price', price.toString())

    console.log('Current months value:', months);
    console.log('Current gymId value:', ClassID);
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

}
