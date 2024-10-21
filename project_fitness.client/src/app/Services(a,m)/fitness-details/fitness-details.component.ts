import { Component } from '@angular/core';
import { CreatePaymentRequestDto, URLService } from '../../url/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fitness-details',
  templateUrl: './fitness-details.component.html',
  styleUrl: './fitness-details.component.css'
})
export class FitnessDetailsComponent {

  parameter: any
  Details: any

  ngOnInit() {
    debugger
    this.parameter = this._route.snapshot.paramMap.get("id")
    this.getDetails(this.parameter)
  }
  constructor(private _ser: URLService, private _route: ActivatedRoute) { }

  getDetails(id: any) {
    debugger
    this._ser.getClassDetails(id).subscribe((data: any) => {
      this.Details = data;
      console.log(this.Details, 'details')
    }
    )
  }
  addsubscribtion(price: string, months: string) {
    debugger
    console.log(`Subscription selected: ${months} months, total price: ${price} JD`);
  }

}
