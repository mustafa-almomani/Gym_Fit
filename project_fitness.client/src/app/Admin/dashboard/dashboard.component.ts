import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  ngOnInit() {
    this.GetAllTestimonial();
  }


  constructor(private _ser: URLService) {

  }

  TestimonialArray: any
  GetAllTestimonial() {
    this._ser.GetAllTestimonialToAccept().subscribe((data) => {
      this.TestimonialArray = data
      console.log(this.TestimonialArray, "this.TestimonialArray")
    })
  }


  deleteContactById(id: any) {
    this._ser.deleteTestimonial(id).subscribe(() => {
      alert("This  message deleted successfully");
      this.GetAllTestimonial();
    });
  }

}
